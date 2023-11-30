// CreateEcommer.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEcommer.css'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const CreateEcommer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  const handleCreateEcommer = () => {
    axios
      .post('http://127.0.0.1:8000/ecommerces/create/', {
        name: name,
        key: key,
      })
      .then(response => {
        // Después de crear un nuevo e-commer, navegar de nuevo a la vista principal
        navigate('/ecommers');
      })
      .catch(error => {
        console.error('Error al crear un nuevo e-commer:', error);
      });
  };

  return (
    <div className="container">
      <h2>Crear E-commerce</h2>

      <div>
        <label>Nombre del E-commerce:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <label>Clave del E-commerce:</label>
        <input type="text" value={key} onChange={e => setKey(e.target.value)} />
      </div>

      <button className="save-button" onClick={handleCreateEcommer}>
        Crear E-commerce
      </button>
      <button className="cancel-button" onClick={() => navigate('/ecommers')}>
        Cancelar
      </button>
    </div>
  );
};

export default CreateEcommer;
