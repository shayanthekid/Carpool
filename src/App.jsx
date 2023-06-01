import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import AdminLogin from './login';
import CreateCar from './admin/createCar';
import Store from './user/store';
import Landing from './user/landing';
import Navbar from './Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {

  return (
    <>
      <div>
        <Router>
          <div className="pt-20">
        <Navbar/>
            <Routes>
      
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/cars" element={<CreateCar />} />
              <Route path="/store" element={<Store />} />
              <Route path="/home" element={<Landing />} />
             
            </Routes>
          </div>
        </Router>
      </div> 
    </>
  )
}

// export default  withAuthenticator(App);
export default  (App);
