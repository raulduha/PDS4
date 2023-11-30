import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate =useNavigate();
  const handleLogout = () => {
    // Llama a la función onLogout para cerrar sesión
    onLogout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <h1>Locker System</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/status">Estado Lockers</Link>
            </li>
            <li>
              <Link to="/adashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/reservation">reservas</Link>
            </li>
            <li>
              <Link to="/ecommers">E-commers</Link>
            </li>
            <li>
              <Link to="/stations">estaciones</Link>
            </li>
            <li>
              {/* Agrega un enlace para cerrar sesión */}
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
            {/* Otros enlaces autenticados aquí */}
          </>
        ) : (
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
