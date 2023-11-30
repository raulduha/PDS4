import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ecommers = () => {
  const [ecommers, setEcommers] = useState([]);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/ecommerces/')
      .then(response => {
        setEcommers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de e-commers:', error);
      });
  }, [ecommers]);

  const handleDeleteEcommer = (ecommerceId) => {
    axios.delete(`http://127.0.0.1:8000/ecommerces/${ecommerceId}/delete/`)
      .then(response => {
        setEcommers(ecommers.filter(ecommer => ecommer.id !== ecommerceId));
      })
      .catch(error => {
        console.error('Error al eliminar el e-commer:', error);
      });
  };

  return (
    <div>
      <h2>E-commers</h2>

      {/* Lista de e-commers */}
      <ul>
        {ecommers.map(ecommer => (
          <li key={ecommer.id}>
            {ecommer.name} - {ecommer.key}
            {/* Usa Link para navegar a la vista de actualización */}
            <Link to={`/ecommers/${ecommer.id}/update`}>
              <button>Actualizar</button>
            </Link>
            <button onClick={() => handleDeleteEcommer(ecommer.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div>
        {/* Botón para ir a la vista de creación */}
        <Link to="/ecommers/create">
            <button>Crear Nuevo E-commerce</button>
        </Link>
      </div>
    </div>
  );
};

export default Ecommers;
