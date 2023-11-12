// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Crea este archivo CSS para estilizar la página de inicio de sesión si es necesario

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Realiza una solicitud al backend para autenticar al usuario
      const response = await fetch('URL_DEL_BACKEND/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Si la autenticación es exitosa, llama a la función onLogin
        // para notificar al componente principal que el usuario ha iniciado sesión
        onLogin();
      } else {
        // Maneja errores de autenticación aquí
        console.error('Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error de red', error);
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
