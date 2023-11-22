import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import PackageRetrieval from './components/packageRetrieval/PackageRetrieval';
import LockerStatus from './components/lockerStatus/LockerStatus';
import UserRegistration from './components/userRegistration/UserRegistration';
import LockerReservation from './components/lockerReservation/LockerReservation';
import HomePage from './components/homePage/HomePage';
import LoginPage from './components/login/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/adminDashboard/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/reservation" element={<LockerReservation />} />
          <Route path="/adashboard" element={<AdminDashboard />} />
          <Route path="/retrieval" element={<PackageRetrieval />} />
          <Route path="/status" element={isLoggedIn ? <LockerStatus /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
