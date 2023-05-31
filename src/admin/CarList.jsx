import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CarList = ({ layout }) => {
    const [cars, setCars] = useState([]);
    const [editableFields, setEditableFields] = useState({});

    const handleUpdate = (carId) => {
        setEditableFields((prevState) => ({
            ...prevState,
            [carId]: true,
        }));
    };

    const handleSave = (carId) => {
        // Perform save/update logic here
        // You can access the updated field values from editableFields[carId]

        // After saving, remove the editable state for all fields
        setEditableFields((prevState) => {
            const updatedFields = { ...prevState };
            Object.keys(updatedFields).forEach((key) => {
                updatedFields[key] = false;
            });
            return updatedFields;
        });
    };
    const handleDelete = async (carId) => {
        try {
            await axios.delete(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars?id=${carId}`);
        
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
            console.log('Car record deleted successfully');
        } catch (error) {
            // Handle the error
            console.error('Failed to delete car record:', error);
        }
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(
                    'https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars'
                ); // Replace with your API endpoint URL
                setCars(response.data);
            } catch (error) {
                console.error('Error retrieving cars:', error);
            }
        };

        fetchCars();
    }, []);

    if (layout === 'table') {
        return (
            <div>
                <h1>Car List - Table View</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Car Name</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Seat Layout</th>
                            <th>Exterior Color</th>
                            <th>Interior Color</th>
                            <th>Wheels</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                               
                                <td>
                                    
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.car_Name}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, car_Name: e.target.value } : c
                                                    )
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.car_Name
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.year}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) => (c.id === car.id ? { ...c, year: e.target.value } : c))
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.year
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.price}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) => (c.id === car.id ? { ...c, price: e.target.value } : c))
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.price
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.seatLayout}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, seatLayout: e.target.value } : c
                                                    )
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.seatLayout
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.exteriorColor}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, exteriorColor: e.target.value } : c
                                                    )
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.exteriorColor
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.interiorColor}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, interiorColor: e.target.value } : c
                                                    )
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.interiorColor
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <input
                                            type="text"
                                            value={car.wheels}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) => (c.id === car.id ? { ...c, wheels: e.target.value } : c))
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.wheels
                                    )}
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <button onClick={() => handleSave(car.id)}>Save</button>
                                    ) : (
                                        <div>
                                                <button onClick={() => handleUpdate(car.id)}>Update</button>
                                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                                          </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Default layout is list view
    return (
        <div>
            <h1>Car List - List View</h1>
            {/* Render the list of cards */}
            {cars.map((car) => (
                <div key={car.id} className="car-card">
                    <h3>{car.car_Name}</h3>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}</p>
                    <p>Seat Layout: {car.seatLayout}</p>
                    <p>Exterior Color: {car.exteriorColor}</p>
                    <p>Interior Color: {car.interiorColor}</p>
                    <p>Wheels: {car.wheels}</p>
                    <p>Key Features: {car.keyFeatures}</p>
                    <img src={car.carImageUrl} alt="Car" />
                    {/* Display other car details */}
                    {/* You can style and format the data as needed */}
                </div>
            ))}
        </div>
    );
};

CarList.propTypes = {
    layout: PropTypes.oneOf(['table', 'list']).isRequired,
};

export default CarList;
