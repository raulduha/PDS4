import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Obtiene la función navigate

  const handleLogin = () => {
    // Lista de usuarios y contraseñas temporales (simulación)
    const users = [
      { username: 'repartidor', password: '12345678', userType: 'repartidor' },
      { username: 'supervisor', password: '12345678', userType: 'supervisor' },
    ];

    // Verificar si el usuario y la contraseña coinciden en la lista
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // Si la autenticación es exitosa, llama a la función onLogin con el tipo de usuario
      onLogin(user.userType);

      // Redirige a la página de inicio ('/')
      navigate('/');
    } else {
      // Maneja errores de autenticación aquí
      console.error('Error de inicio de sesión');
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
