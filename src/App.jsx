import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import AdminLogin from './login';
import CreateCar from './admin/createCar';

import './App.css'

function App() {

  return (
    <>
      <div>
        <Router>
          <div className="pt-20">
        
            <Routes>
      
              <Route path="/login" element={<AdminLogin />} />
              <Route path="/admin/cars" element={<CreateCar />} />
             
            </Routes>
          </div>
        </Router>
      </div> 
    </>
  )
}

export default  withAuthenticator(App);
