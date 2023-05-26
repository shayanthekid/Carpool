import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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

  const handleCarNameChange = (e) => {
    setCarName(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSeatLayoutChange = (e) => {
    setSeatLayout(e.target.value);
  };

  const handleExteriorColorChange = (e) => {
    setExteriorColor(e.target.value);
  };

  const handleInteriorColorChange = (e) => {
    setInteriorColor(e.target.value);
  };

  const handleWheelsChange = (e) => {
    setWheels(e.target.value);
  };

  const handleKeyFeaturesChange = (e) => {
    setKeyFeatures(e.target.value);
  };

  const handleCarImageChange = (e) => {
    const file = e.target.files[0];
    setCarImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const binaryData = fileReader.result;
        const fileName = `${uuidv4()}.${carImage.name.split('.').pop()}`;
        const car_ID = parseInt(uuidv4().replace(/-/g, ''), 16);

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
          car_ID: car_ID,
          year: year,
          price: price,
          seatLayout: seatLayout,
          exteriorColor: exteriorColor,
          interiorColor: interiorColor,
          wheels: wheels,
          keyFeatures: keyFeatures, 
          carImageUrl: `https://carstest123.s3.amazonaws.com/${fileName}`, // Fill this with the uploaded image URL
        };

        // Call the Lambda function to add car details to DynamoDB
        const lambdaResponse = await axios.post('https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/cars', carData);
        console.log(lambdaResponse.data);
        // Handle the Lambda response as needed
      };

      fileReader.readAsArrayBuffer(carImage);
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

        <label htmlFor="seat_layout">Seat Layout:</label>
        <input
          type="text"
          name="seat_layout"
          id="seat_layout"
          value={seatLayout}
          onChange={handleSeatLayoutChange}
          required
        /><br /><br />

        <label htmlFor="exterior_color">Exterior Color:</label>
        <input
          type="text"
          name="exterior_color"
          id="exterior_color"
          value={exteriorColor}
          onChange={handleExteriorColorChange}
          required
        /><br /><br />

        <label htmlFor="interior_color">Interior Color:</label>
        <input
          type="text"
          name="interior_color"
          id="interior_color"
          value={interiorColor}
          onChange={handleInteriorColorChange}
          required
        /><br /><br />

        <label htmlFor="wheels">Wheels:</label>
        <input
          type="text"
          name="wheels"
          id="wheels"
          value={wheels}
          onChange={handleWheelsChange}
          required
        /><br /><br />

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
    </div>
  );
};

export default CreateCar;
