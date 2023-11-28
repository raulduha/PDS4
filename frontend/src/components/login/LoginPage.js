import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa axios
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login-operator/', {
        email: username,
        password: password,
      });
  
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
