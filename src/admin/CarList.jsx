import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CarList = ({ layout }) => {
    const [cars, setCars] = useState([]);
    const [editableFields, setEditableFields] = useState({});
    const [filterBrand, setFilterBrand] = useState('');
    const [filterStartYear, setFilterStartYear] = useState('');
    const [filterEndYear, setFilterEndYear] = useState('');
    const handleUpdate = (carId) => {
        setEditableFields((prevState) => ({
            ...prevState,
            [carId]: true,
        }));
    };
    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            if (filterBrand && car.brand.toLowerCase() !== filterBrand.toLowerCase()) {
                return false;
            }
            if (filterStartYear && filterEndYear) {
                const startYear = parseInt(filterStartYear);
                const endYear = parseInt(filterEndYear);
                if (car.year < startYear || car.year > endYear) {
                    return false;
                }
            }
            return true;
        });
    }, [cars, filterBrand, filterStartYear, filterEndYear]);


    const handleSave = async (car) => {
        try {
            // Get the updated field values from editableFields[car.id]
            // const updatedFields = editableFields[car.id];

            // Perform save/update logic here
            await axios.put(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars`, car);

            // After saving, remove the editable state for all fields
            setEditableFields((prevState) => {
                const updatedFields = { ...prevState };
                Object.keys(updatedFields).forEach((key) => {
                    updatedFields[key] = false;
                });
                return updatedFields;
            });

            console.log('Car record updated successfully');
        } catch (error) {
            // Handle the error
            console.error('Failed to update car record:', error);
            console.log(car);
        }
    };
    const handleDelete = async (carId, carImageUrl) => {
        try {
            const imageName = carImageUrl.split('/').pop();
            await axios.delete(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars?id=${carId}`);

            await axios.delete(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/carstest123/${imageName}`);
            
            
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
                            <th>Brand</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Seat Layout</th>
                            <th>Exterior Color</th>
                            <th>Interior Color</th>
                            <th>Wheels</th>
                            <th>Key Features</th>
                            <th>Image</th>
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
                                            value={car.brand}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) => (c.id === car.id ? { ...c, brand: e.target.value } : c))
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.brand
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
                                        <input
                                            type="text"
                                            value={car.keyFeatures}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) => (c.id === car.id ? { ...c, keyFeatures: e.target.value } : c))
                                                );
                                            }}
                                        />
                                    ) : (
                                            car.keyFeatures
                                    )}
                                </td>
                                <td>
                                    <img src={car.carImageUrl} alt="" /> 
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <button onClick={() => handleSave(car)}>Save</button>
                                    ) : (
                                        <div>
                                                <button onClick={() => handleUpdate(car.id)}>Update</button>
                                                <button onClick={() => handleDelete(car.id, car.carImageUrl)}>Delete</button>
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
            <h1>Car List - Table View</h1>
            <div>
                <label>Brand:</label>
                <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                    <option value="">All</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Volkswagen">Volkswagen</option>
                </select>
            </div>
            <div>
                <label>Year Range:</label>
                <input
                    type="text"
                    placeholder="Start Year"
                    value={filterStartYear}
                    onChange={(e) => setFilterStartYear(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="End Year"
                    value={filterEndYear}
                    onChange={(e) => setFilterEndYear(e.target.value)}
                />
            </div>
            {/* Render the list of cards */}
            {filteredCars.map((car) => (
                <div key={car.id} className="car-card">
                    <h3>{car.car_Name}</h3>
                    <p>Brand: {car.brand}</p>
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
