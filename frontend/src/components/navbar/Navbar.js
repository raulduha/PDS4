import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Locker System</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                
            </ul>
        </div>
    );
}

export default Navbar;
//<li>
//<Link to="/registration">Registro de Usuarios</Link>
//</li>
//<li>
//    <Link to="/reservation">Reserva de Lockers</Link>
//</li>
//<li>
//    <Link to="/retrieval">Retiro de Paquetes</Link>
//</li>
//<li>
//    <Link to="/status">Estado de Lockers</Link>
//</li>