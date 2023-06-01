import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CarList from './CarList';
import Swal from 'sweetalert2';
import { withAuthenticator } from '@aws-amplify/ui-react';
import withReactContent from 'sweetalert2-react-content';

import { useAuthenticator, Heading } from '@aws-amplify/ui-react';
export function Protected() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === 'authenticated' ? 'FIRST PROTECTED ROUTE!' : 'Loading...';
  return <Heading level={1}>{message}</Heading>;
}
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
        // const binaryData = fileReader.result;
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
    
    
      const MySwal = withReactContent(Swal)

      MySwal.fire({
        title: <strong>Car created!</strong>,        
        icon: 'success'
      })
    
    } catch (error) {

      const MySwal2 = withReactContent(Swal)

      MySwal2.fire({
        title: <strong>Car Not created</strong>,
        html: <i>{error}</i>,
        icon: 'error'
      })
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div className='vw-100 bg-black'>
    <div className="container ">
      <h1 className="text-center text-white">Add Car Details</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
                <label htmlFor="car_name " className="form-label text-white">Car Name:</label>
          <input
            type="text"
            className="form-control"
            name="car_name"
            id="car_name"
            value={carName}
            onChange={handleCarNameChange}
            required
          />
        </div>

        <div className="row g-2">
          <div className="col-md">
                  <label htmlFor="year" className="form-label text-white">Year:</label>
            <input
              type="text"
              className="form-control"
              name="year"
              id="year"
              value={year}
              onChange={handleYearChange}
              pattern="[0-9]*" // Only allow numeric input
              required
            />
          </div>
          <div className="col-md">
                  <label htmlFor="price" className="form-label text-white">Price:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
                <label htmlFor="brand" className="form-label text-white">Brand:</label>
          <select className="form-select" name="brand" id="brand" value={brand} onChange={handleBrandChange} required>
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
        </div>

        <div className="row g-2">
          <div className="col-md">
                  <label htmlFor="seat_layout" className="form-label text-white">Seat Layout:</label>
            <select className="form-select" name="seat_layout" id="seat_layout" value={seatLayout} onChange={handleSeatLayoutChange} required>
              <option value="">Select seat layout</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="col-md">
                  <label htmlFor="exterior_color" className="form-label text-white">Exterior Color:</label>
            <select className="form-select" name="exterior_color" id="exterior_color" value={exteriorColor} onChange={handleExteriorColorChange} required>
              <option value="">Select exterior color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Silver">Silver</option>
              {/* Add more popular car colors as options */}
            </select>
          </div>
        </div>

        <div className="row g-2">
          <div className="col-md">
                  <label htmlFor="interior_color" className="form-label text-white">Interior Color:</label>
            <select className="form-select" name="interior_color" id="interior_color" value={interiorColor} onChange={handleInteriorColorChange} required>
              <option value="">Select interior color</option>
              <option value="Beige">Beige</option>
              <option value="Black">Black</option>
              <option value="Gray">Gray</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
              {/* Add more popular car colors as options */}
            </select>
          </div>
          <div className="col-md">
                  <label htmlFor="wheels" className="form-label text-white">Wheels:</label>
            <select className="form-select" name="wheels" id="wheels" value={wheels} onChange={handleWheelsChange} required>
              <option value="">Select number of wheels</option>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
                <label htmlFor="key_features" className="form-label text-white">Key Features:</label>
          <input
            type="text"
            className="form-control"
            name="key_features"
            id="key_features"
            value={keyFeatures}
            onChange={handleKeyFeaturesChange}
            required
          />
        </div>

        <div className="mb-3">
                <label htmlFor="car_image" className="form-label text-white">Car Image:</label>
          <input
            type="file"
            className="form-control"
            name="car_image"
            id="car_image"
            onChange={handleCarImageChange}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
</div>
</div>
      <CarList layout="table" refresh={refreshCarList} />
    </div>

    </div>
  );
};

export default withAuthenticator(CreateCar, {

});
