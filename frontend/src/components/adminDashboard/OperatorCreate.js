// OperatorCreate.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  last_name: '',
  email: '',
  password: '',
  is_supervisor: false,
};

const OperatorCreate = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, is_supervisor: !formData.is_supervisor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, last_name, email, password, is_supervisor } = formData;

    try {
      // Utilizar la URL proporcionada para enviar la solicitud POST
      const url = `https://backend-p3.vercel.app/operators/create/${name}/${last_name}/${email}/${password}/${is_supervisor}/`;
      const response = await axios.post(url);

      console.log('Operador creado:', response.data);
      // Realizar acciones adicionales después de la creación si es necesario
      navigate('/adashboard'); // Redirigir al Admin Dashboard
    } catch (error) {
      console.error('Error al crear el operador:', error);
      // Manejo de errores: puedes establecer un estado de error y mostrar mensajes de error
    }
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
        <input type="checkbox" name="is_supervisor" checked={formData.is_supervisor} onChange={handleCheckboxChange} />

        <button type="submit">Crear Operador</button>
      </form>
    </div>
  );
};

export default OperatorCreate;

