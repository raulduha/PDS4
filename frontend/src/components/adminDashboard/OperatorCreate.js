import React, { useState } from 'react';
import axios from 'axios';
import './OperatorCreate.css';
import { useNavigate } from 'react-router-dom';

const OperatorCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    is_supervisor: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud POST para crear un operador
    axios.post('http://127.0.0.1:8000/operators/create/', formData)
      .then(response => {
        console.log('Operador creado:', response.data);
        // Realizar acciones adicionales después de la creación si es necesario
        navigate('/adashboard'); // Redirigir al Admin Dashboard
      })
      .catch(error => {
        console.error('Error al crear el operador:', error);
      });
  };
  
  

  return (
    <div>
      <h3>Crear Operador</h3>
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

        <button type="submit">Crear Operador</button>
      </form>
    </div>
  );
};

export default OperatorCreate;
