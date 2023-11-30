import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Configura Axios para que no incluya automáticamente el encabezado Origin
      const axiosInstance = axios.create({
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar otros encabezados personalizados si es necesario
        },
        // Configuración adicional de Axios si es necesario
      });

      const response = await axiosInstance.post(`https://backend-p3.vercel.app/operators/login/${username}/${password}/`);

      if (response.data) {
        // Almacena la información de autenticación en localStorage
        localStorage.setItem('userType', response.data);

        // Llama a la función onLogin con el tipo de usuario
        onLogin(response.data);

        // Redirige a la página de inicio ('/')
        navigate('/');
      } else {
        console.error('Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <div className="login-form">
        <label>Usuario</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default LoginPage;
