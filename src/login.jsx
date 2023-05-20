import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [newPasswordRequired, setNewPasswordRequired] = useState(false); // Track if new password is required

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
                if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    // User is required to set a new password
                    setNewPasswordRequired(true);
                } else {
                    // Handle successful authentication here
                    console.log('Login successful', result);
                    setShowSuccessModal(true);
                }
            },
            onFailure: (error) => {
                // Handle authentication failure here
                console.log('Login failed', error);
            },
        });
    };

    const handleNewPasswordSubmit = (e) => {
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

        // Set the new password for the user
        cognitoUser.completeNewPasswordChallenge(password, {}, {
            onSuccess: (result) => {
                // Handle successful password update here
                console.log('Password update successful', result);
                setShowSuccessModal(true);
            },
            onFailure: (error) => {
                // Handle password update failure here
                console.log('Password update failed', error);
            },
        });
    };

    const closeModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div>
            <h1>Login</h1>
            {newPasswordRequired ? ( // Render the new password form if required
                <form onSubmit={handleNewPasswordSubmit}>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Submit New Password</button>
                </form>
            ) : ( // Render the regular login form
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            )}

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
