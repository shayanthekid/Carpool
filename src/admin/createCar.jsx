import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CreateCar = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const binaryData = fileReader.result;
        const fileName = `${uuidv4()}.${avatar.name.split('.').pop()}`;

        const response = await axios.put(`https://w0a5xhvof8.execute-api.us-east-1.amazonaws.com/desk/carstest123/${fileName}`, avatar, {
          headers: {
            'Content-Type': avatar.type,
          },
        });

        console.log(response.data);
        // Handle the response as needed
      };

      fileReader.readAsArrayBuffer(avatar);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div>
      <h1>Upload User Avatar</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        /><br /><br />
        <label htmlFor="user_avatar">Avatar:</label>
        <input
          type="file"
          name="user_avatar"
          id="user_avatar"
          onChange={handleAvatarChange}
          required
        /><br /><br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default CreateCar;
