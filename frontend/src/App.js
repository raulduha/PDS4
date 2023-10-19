import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import PackageRetrieval from './components/packageRetrieval/PackageRetrieval';
import LockerStatus from './components/lockerStatus/LockerStatus';
import UserRegistration from './components/userRegistration/UserRegistration';
import LockerReservation from './components/lockerReservation/LockerReservation';
import HomePage from './components/homePage/HomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/reservation" element={<LockerReservation />} />
          <Route path="/retrieval" element={<PackageRetrieval />} />
          <Route path="/status" element={<LockerStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


