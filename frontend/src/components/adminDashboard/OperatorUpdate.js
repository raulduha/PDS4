import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OperatorUpdate.css';
// Importa el hook useParams
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const OperatorUpdate = () => {
  // Utiliza el hook useParams para obtener los parámetros de la URL
  const { operator_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    is_supervisor: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(operator_id); // Agrega esto para verificar el ID del operador
    axios.get(`https://pds-4.vercel.app/operators/${operator_id}/`)
      .then(response => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching operator details:', error);
        setLoading(false);
      });
  }, [operator_id]);
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud PUT para actualizar el operador
    axios.put(`https://pds-4.vercel.app/operators/${operator_id}/update/`, formData)
      .then(response => {
        console.log('Operador actualizado:', response.data);
        // Realizar acciones adicionales después de la actualización si es necesario
        navigate('/adashboard');

      })
      .catch(error => {
        console.error('Error al actualizar el operador:', error);
      });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

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
