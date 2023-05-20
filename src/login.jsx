import React from 'react';
import { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        const poolData = {
            UserPoolId: 'us-east-1_wuRTAbW0t',
            ClientId: '3divht779pg4v3gq3q98h93lqs',
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                // Handle successful authentication here
                console.log('Login successful', result);
                setShowSuccessModal(true);
            },
            onFailure: (error) => {
                // Handle authentication failure here
                console.log('Login failed', error);
            },
        });
    };

    const closeModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>

            <Modal
                isOpen={showSuccessModal}
                onRequestClose={closeModal}
                contentLabel="Login Successful Modal"
            >
                <h2>Login Successful</h2>
                <p>You have successfully logged in.</p>
                <button onClick={closeModal}>Close</button>
                <div>
                    <Link to="/admindashboard">
                        <button>Go to Admin Dashboard</button>
                    </Link>
                </div>
            </Modal>
        </div>
    );
};

export default AdminLogin;