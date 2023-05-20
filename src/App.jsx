import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './login';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Router>
          <div className="pt-20">
        
            <Routes>
      
              <Route path="/login" element={<AdminLogin />} />
     
            </Routes>
          </div>
        </Router>
      </div> 
    </>
  )
}

export default App;
