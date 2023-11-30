// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import PackageRetrieval from './components/packageRetrieval/PackageRetrieval';
import LockerStatus from './components/lockerStatus/LockerStatus';
import UserRegistration from './components/userRegistration/UserRegistration';
import LockerReservation from './components/lockerReservation/LockerReservation';
import HomePage from './components/homePage/HomePage';
import LoginPage from './components/login/LoginPage';
import OperatorCreate from './components/adminDashboard/OperatorCreate';
import OperatorUpdate from './components/adminDashboard/OperatorUpdate';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ecommers from './components/ecommers/Ecommers';
import UpdateEcommer from './components/ecommers/UpdateEcommer';  // Importa la nueva vista
import CreateEcommer from './components/ecommers/CreateEcommer';  // Importa la nueva vista
import LockerCreate from './components/station/LockerCreate';
import LockerList from './components/station/LockerList';
import StationCreate from './components/station/StationCreate';
import StationList from './components/station/StationList';
import StationView from './components/station/StationView';
import StationUpdate from './components/station/StationUpdate';
import LockerView from './components/station/LockerView';
import LockerUpdate from './components/station/LockerUpdate';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Limpia la información de autenticación almacenada en localStorage
    localStorage.removeItem('userType');
  };

  // Verifica si hay información de autenticación en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setIsLoggedIn(true);
    }
  }, []); // El segundo argumento vacío asegura que esto solo se ejecute una vez al montar el componente

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
          <Route
            path="/status"
            element={isLoggedIn ? <LockerStatus /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/editOP/:operator_id"
            element={isLoggedIn ? <OperatorUpdate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/createOP"
            element={isLoggedIn ? <OperatorCreate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/ecommers"
            element={isLoggedIn ? <Ecommers /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/ecommers/:ecommerce_id/update"
            element={isLoggedIn ? <UpdateEcommer /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          {/* Nueva ruta para la vista de actualización de e-commers */}
          <Route
            path="/stations"
            element={isLoggedIn ? <StationList /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/stations/:station_id"
            element={isLoggedIn ? <StationView /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/stations/:station_id/update"
            element={isLoggedIn ? <StationUpdate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/stations/create"
            element={isLoggedIn ? <StationCreate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/lockers"
            element={isLoggedIn ? <LockerList /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/lockers/:locker_id"
            element={isLoggedIn ? <LockerView /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/lockers/:locker_id/update"
            element={isLoggedIn ? <LockerUpdate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/lockers/create"
            element={isLoggedIn ? <LockerCreate /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route 
            path="/ecommers/create"
            element={<CreateEcommer />} 
          />
          <Route
            path="/ecommers/update"
            element={isLoggedIn ? <UpdateEcommer /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
