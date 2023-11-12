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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/reservation" element={<LockerReservation />} />
          <Route path="/retrieval" element={<PackageRetrieval />} />
          <Route path="/status" element={<LockerStatus/>}/>
          {/* Agregar la ruta al componente LoginPage */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
//<Route path="/status" element={isLoggedIn ? <LockerStatus /> : <LoginPage onLogin={handleLogin} />} />
          

