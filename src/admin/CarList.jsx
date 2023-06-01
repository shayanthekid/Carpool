import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../CarCard.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CarList = ({ layout }) => {
    const [cars, setCars] = useState([]);
    const [editableFields, setEditableFields] = useState({});
    const [filterBrand, setFilterBrand] = useState('');
    const [filterStartYear, setFilterStartYear] = useState('');
    const [filterEndYear, setFilterEndYear] = useState('');
    const [filterCarName, setFilterCarName] = useState('');
    const [filterMinPrice, setFilterMinPrice] = useState('');
    const [filterMaxPrice, setFilterMaxPrice] = useState('');
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
            if (filterCarName && !car.car_Name.toLowerCase().includes(filterCarName.toLowerCase())) {
                return false;
            }
            if (filterMinPrice && filterMaxPrice) {
                const minPrice = parseFloat(filterMinPrice);
                const maxPrice = parseFloat(filterMaxPrice);
                if (car.price < minPrice || car.price > maxPrice) {
                    return false;
                }
            }
            return true;
        });
    }, [cars, filterBrand, filterStartYear, filterEndYear, filterCarName, filterMinPrice, filterMaxPrice]);


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

            const MySwal3 = withReactContent(Swal)
            MySwal3.fire({
                title: <strong>Failed to delete car record</strong>,
                icon: 'success'
            })

            console.log('Car record updated successfully');
        } catch (error) {
            // Handle the error
            const MySwal4 = withReactContent(Swal)
            MySwal4.fire({
                title: <strong>Failed to delete car record</strong>,
                icon: 'error'
            })
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
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                title: <strong>Car record deleted successfully</strong>,
                icon: 'success'
            })
        } catch (error) {
            const MySwal2 = withReactContent(Swal)
            MySwal2.fire({
                title: <strong>Failed to delete car record</strong>,
                icon: 'error'
            })
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
           
            <div className="text-center text-white">
                    <h1>Car List - Table View</h1>
                    <div className="table-responsive">
                        <table className="table table-striped">
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
                                            className="form-control"
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
                                            className="form-control"
                                            value={car.brand}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, brand: e.target.value } : c
                                                    )
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
                                            className="form-control"
                                            value={car.year}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, year: e.target.value } : c
                                                    )
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
                                            className="form-control"
                                            value={car.price}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, price: e.target.value } : c
                                                    )
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
                                            className="form-control"
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
                                            className="form-control"
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
                                            className="form-control"
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
                                            className="form-control"
                                            value={car.wheels}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, wheels: e.target.value } : c
                                                    )
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
                                            className="form-control"
                                            value={car.keyFeatures}
                                            onChange={(e) => {
                                                // Update the input value in the state
                                                setCars((prevState) =>
                                                    prevState.map((c) =>
                                                        c.id === car.id ? { ...c, keyFeatures: e.target.value } : c
                                                    )
                                                );
                                            }}
                                        />
                                    ) : (
                                        car.keyFeatures
                                    )}
                                </td>
                                <td>
                                    <img src={car.carImageUrl} alt="" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                                </td>
                                <td>
                                    {editableFields[car.id] ? (
                                        <button className="btn btn-primary" onClick={() => handleSave(car)}>
                                            Save
                                        </button>
                                    ) : (
                                        <div>
                                            <button className="btn btn-secondary" onClick={() => handleUpdate(car.id)}>
                                                Update
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(car.id, car.carImageUrl)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }

    // Default layout is list view
    return (
        <div className="text-center">
            <h1>Store</h1>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>Brand:</label>
                        <select className="form-control" value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
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
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>Car Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Car Name"
                            value={filterCarName}
                            onChange={(e) => setFilterCarName(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>Price Range:</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control mr-2"
                                placeholder="Min Price"
                                value={filterMinPrice}
                                onChange={(e) => setFilterMinPrice(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Max Price"
                                value={filterMaxPrice}
                                onChange={(e) => setFilterMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label>Year Range:</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control mr-2"
                                placeholder="Start Year"
                                value={filterStartYear}
                                onChange={(e) => setFilterStartYear(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="End Year"
                                value={filterEndYear}
                                onChange={(e) => setFilterEndYear(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
<br/>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="d-flex flex-wrap justify-content-between">
                        {filteredCars.map((car) => (
                            <div key={car.id} className="card mb-4" style={{ width: 'calc(33.33% - 1rem)' }}>
                                <img src={car.carImageUrl} className="card-img-top" alt="Car" style={{ objectFit: 'cover', height: '200px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{car.car_Name}</h5>
                                    <p className="card-text">Brand: {car.brand}</p>
                                    <p className="card-text">Year: {car.year}</p>
                                    <p className="card-text">Price: {car.price}</p>
                                    <p className="card-text">Seat Layout: {car.seatLayout}</p>
                                    <p className="card-text">Exterior Color: {car.exteriorColor}</p>
                                    <p className="card-text">Interior Color: {car.interiorColor}</p>
                                    <p className="card-text">Wheels: {car.wheels}</p>
                                    <p className="card-text">Key Features: {car.keyFeatures}</p>
                                    {/* Display other car details */}
                                    {/* You can style and format the data as needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
};

CarList.propTypes = {
    layout: PropTypes.oneOf(['table', 'list']).isRequired,
};

export default CarList;
