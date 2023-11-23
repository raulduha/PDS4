import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OperatorUpdate.css';

const OperatorUpdate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    is_supervisor: false,
  });

  useEffect(() => {
    // Obtener los detalles del operador al cargar el componente
    axios.get(`http://127.0.0.1:8000/operators/${match.params.operator_id}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching operator details:', error);
      });
  }, [match.params.operator_id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud PUT para actualizar el operador
    axios.put(`/operators/${match.params.operator_id}/update/`, formData)
      .then(response => {
        console.log('Operador actualizado:', response.data);
        // Realizar acciones adicionales después de la actualización si es necesario
      })
      .catch(error => {
        console.error('Error al actualizar el operador:', error);
      });
  };

  return (
    <div>
      <h3>Actualizar Operador</h3>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

        <label>Apellido:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <label>Contraseña:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />

        <label>¿Es supervisor?</label>
        <input type="checkbox" name="is_supervisor" checked={formData.is_supervisor} onChange={() => setFormData({ ...formData, is_supervisor: !formData.is_supervisor })} />

        <button type="submit">Actualizar Operador</button>
      </form>
    </div>
  );
};

export default OperatorUpdate;
