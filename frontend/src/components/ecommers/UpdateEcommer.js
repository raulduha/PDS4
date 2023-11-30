// UpdateEcommer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateEcommer.css';

const UpdateEcommer = () => {
  const { ecommerce_id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener los datos del e-commer específico
    axios.get(`https://backend-p3.vercel.app/ecommerces/${ecommerce_id}/`)
      .then(response => {
        const ecommerData = response.data;
        setName(ecommerData.name);
        setKey(ecommerData.key);
      })
      .catch(error => {
        console.error('Error al obtener los datos del e-commer:', error);
      });
  }, [ecommerce_id]);

  const handleUpdateEcommer = () => {
    // Llamada a la API para actualizar los datos del e-commer
    axios.put(`https://backend-p3.vercel.app/ecommerces/update/${ecommerce_id}/${name}/${key}/`, {
      name: name,
      key: key
    })
      .then(response => {
        // Navegar a la vista de lista de e-commers después de la actualización
        navigate('/ecommers');
      })
      .catch(error => {
        console.error('Error al actualizar el e-commer:', error);
      });
  };

  const handleCancel = () => {
    // Navegar atrás en la pila de historial
    navigate('/ecommers');
  };

  return (
    <div className="update-ecommers-container">
      <h2>Actualizar E-commerce</h2>

      <div>
        <label>Nombre del E-commerce:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Clave del E-commerce:</label>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
      </div>

      <button className="save-button" onClick={handleUpdateEcommer}>Actualizar E-commerce</button>
      <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
    </div>
  );
};

export default UpdateEcommer;
