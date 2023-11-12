import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    // Llama a la función onLogout para cerrar sesión
    onLogout();
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
