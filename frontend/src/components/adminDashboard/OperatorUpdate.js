import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OperatorUpdate.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OperatorUpdate = () => {
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
    console.log(operator_id);
    axios.get(`https://backend-p3.vercel.app/operators/${operator_id}/`)
      .then(response => {
        setFormData(prevFormData => ({
          ...prevFormData,
          name: response.data.name || '', // Update the name field if it exists in the response
          last_name: response.data.last_name || '', // Update the last_name field if it exists in the response
          email: response.data.email || '', // Update the email field if it exists in the response
          password: response.data.password || '', // Update the password field if it exists in the response
          is_supervisor: response.data.is_supervisor || false, // Update the is_supervisor field if it exists in the response, default to false if missing
        }));
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
  
    const encodedEmail = encodeURIComponent(formData.email);
  
    axios.put(`https://backend-p3.vercel.app/operators/update/${operator_id}/${formData.name}/${formData.last_name}/${encodedEmail}/${formData.password}/${formData.is_supervisor ? 'True' : 'False'}/`)
      .then(response => {
        console.log('Operador actualizado:', response.data);
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
