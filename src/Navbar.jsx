import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

const Navbar = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthState(); // Check authentication state when the component mounts
    }, []);

    const checkAuthState = async () => {
        try {
            await Auth.currentAuthenticatedUser();
            setIsAuthenticated(true); // User is logged in
            console.log(Auth.currentAuthenticatedUser());
        } catch (error) {
            setIsAuthenticated(false); // User is not logged in
        }
    };
    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    iCars
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/store' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/store">
                                Visit Store
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li className={`nav-item ${location.pathname === '/admin/login' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/admin/login">
                                   Login
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className={`nav-item ${location.pathname === '/admin/cars' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/admin/cars">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleSignOut}>
                                    Sign Out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
