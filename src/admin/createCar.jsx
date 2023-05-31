import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CarList from './CarList';

const CreateCar = () => {
  const [carName, setCarName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [seatLayout, setSeatLayout] = useState('');
  const [exteriorColor, setExteriorColor] = useState('');
  const [interiorColor, setInteriorColor] = useState('');
  const [wheels, setWheels] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [carImage, setCarImage] = useState(null);
  const [brand, setBrand] = useState(''); 
  const [refreshCarList, setRefreshCarList] = useState(false);

  const handleCarNameChange = (e) => {
    setCarName(e.target.value);
  };

  const handleYearChange = (e) => {
    const inputYear = e.target.value;
    // Remove non-numeric characters from the input
    const validYear = inputYear.replace(/\D/g, '');
    setYear(validYear);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSeatLayoutChange = (e) => {
    const inputLayout = e.target.value;
    // Validate seat layout to be either 2 or 4
    const validLayout = ['2', '4'].includes(inputLayout) ? inputLayout : '';
    setSeatLayout(validLayout);
  };

  const handleExteriorColorChange = (e) => {
    setExteriorColor(e.target.value);
  };

  const handleInteriorColorChange = (e) => {
    setInteriorColor(e.target.value);
  };

  const handleWheelsChange = (e) => {
    const inputWheels = e.target.value;
    // Validate wheels to be either 2 or 4
    const validWheels = ['2', '4'].includes(inputWheels) ? inputWheels : '';
    setWheels(validWheels);
  };

  const handleKeyFeaturesChange = (e) => {
    setKeyFeatures(e.target.value);
  };

  const handleCarImageChange = (e) => {
    const file = e.target.files[0];
    setCarImage(file);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const binaryData = fileReader.result;
        const fileName = `${uuidv4()}.${carImage.name.split('.').pop()}`;
        const id = uuidv4();
         

        const response = await axios.put(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/carstest123/${fileName}`, carImage, {
          headers: {
            
            'Content-Type': carImage.type,
          },
        });

        console.log(response.data);
        // Handle the response as needed

        // Prepare car details to be sent to the Lambda function
        const carData = {
          car_Name: carName,
          id: id,
          year: year,
          price: price,
          seatLayout: seatLayout,
          exteriorColor: exteriorColor,
          interiorColor: interiorColor,
          wheels: wheels,
          keyFeatures: keyFeatures, 
          brand: brand,
          carImageUrl: `https://carstest123.s3.amazonaws.com/${fileName}`, // Fill this with the uploaded image URL
        };

        // Call the Lambda function to add car details to DynamoDB
        const lambdaResponse = await axios.post('https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars', carData);
        console.log(lambdaResponse.data);
        // Handle the Lambda response as needed
      };

      fileReader.readAsArrayBuffer(carImage);
      setRefreshCarList((prevRefresh) => !prevRefresh);

      // Clear the form inputs after successful submission
      setCarName('');
      setYear('');
      setPrice('');
      setBrand('');
      setSeatLayout('');
      setExteriorColor('');
      setInteriorColor('');
      setWheels('');
      setKeyFeatures('');
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Add Car Details</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="car_name">Car Name:</label>
        <input
          type="text"
          name="car_name"
          id="car_name"
          value={carName}
          onChange={handleCarNameChange}
          required
        /><br /><br />

        <label htmlFor="year">Year:</label>
        <input
          type="text"
          name="year"
          id="year"
          value={year}
          onChange={handleYearChange}
          pattern="[0-9]*" // Only allow numeric input
          required
        /><br /><br />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={handlePriceChange}
          required
        /><br /><br />

        <label htmlFor="brand">Brand:</label>
        <select name="brand" id="brand" value={brand} onChange={handleBrandChange} required>
          <option value="">Select a brand</option>
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
        <br /><br />

        <label htmlFor="seat_layout">Seat Layout:</label>
        <select name="seat_layout" id="seat_layout" value={seatLayout} onChange={handleSeatLayoutChange} required>
          <option value="">Select seat layout</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
        <br /><br />

        <label htmlFor="exterior_color">Exterior Color:</label>
        <select name="exterior_color" id="exterior_color" value={exteriorColor} onChange={handleExteriorColorChange} required>
          <option value="">Select exterior color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Silver">Silver</option>
          {/* Add more popular car colors as options */}
        </select>
        <br /><br />

        <label htmlFor="interior_color">Interior Color:</label>
        <select name="interior_color" id="interior_color" value={interiorColor} onChange={handleInteriorColorChange} required>
          <option value="">Select interior color</option>
          <option value="Beige">Beige</option>
          <option value="Black">Black</option>
          <option value="Gray">Gray</option>
          <option value="White">White</option>
          <option value="Brown">Brown</option>
          {/* Add more popular car colors as options */}
        </select>
        <br /><br />

        <label htmlFor="wheels">Wheels:</label>
        <select name="wheels" id="wheels" value={wheels} onChange={handleWheelsChange} required>
          <option value="">Select number of wheels</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
        <br /><br />

        <label htmlFor="key_features">Key Features:</label>
        <input
          type="text"
          name="key_features"
          id="key_features"
          value={keyFeatures}
          onChange={handleKeyFeaturesChange}
          required
        /><br /><br />

        <label htmlFor="car_image">Car Image:</label>
        <input
          type="file"
          name="car_image"
          id="car_image"
          onChange={handleCarImageChange}
          required
        /><br /><br />

        <input type="submit" value="Submit" />
      </form>

      <CarList layout="car-card" refresh={refreshCarList} />

    </div>
  );
};

export default CreateCar;
