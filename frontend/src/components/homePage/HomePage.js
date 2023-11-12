import './HomePage.css';
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';

const HomePage = () => {
  const [userType, setUserType] = useState('client');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [lockerId, setLockerId] = useState('');
  const [lockState, setLockState] = useState('UNLOCKED');

  const awsEndpoint = 'a56zjhbrqce7l-ats.iot.us-east-2.amazonaws.com';
  const awsRegion = 'us-east-2';
  const accessKeyId = 'AKIAU6BRFNUSIDVECJFA';
  const secretAccessKey = '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';

  AWS.config.update({
    region: awsRegion,
    credentials: new AWS.Credentials({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    })
  });

  const iotHandler = new AWS.IotData({ endpoint: awsEndpoint });

  const updateAppState = (newShadow) => {
    setLockState(newShadow.state.desired.lockers.l1.lock);
  };

  function responseHandler(err, data) {
    if (err) {
      console.error('Error updating device shadow:', err);
    } else {
      const newShadow = JSON.parse(data.payload);

      console.log('Device shadow updated:', newShadow);

      updateAppState(newShadow);
    }
  }

  const handleAccess = () => {
    if (password === '') {
      setMessage('Por favor, ingresa una contraseña.');
      return;
    }

    if (!lockerId) {
      setMessage('Debes proporcionar un ID de casillero.');
      return;
    }

    const lockerNumber = parseInt(lockerId);

    if (lockerNumber < 1 || lockerNumber > 3) {
      setMessage('El ID del casillero debe estar entre 1 y 3.');
      return;
    }

    const locker = `l${lockerNumber}`;

    const endpoint = userType === 'client' ? `/locker/abrir/${locker}/` : `/locker/cerrar/${locker}/`;

    axios.get(endpoint, {
      params: {
        pin: lockerId,
        password: password
      }
    }).then((response) => {
      setMessage(response.data.message);
    }).catch((error) => {
      setMessage('Ocurrió un error al conectar con el servidor.');
    });
  };

  return (
    <div className="homepage">
      <h2>Bienvenido al Sistema de Casilleros</h2>
      <p>Reserva, carga y retira paquetes de manera sencilla y eficiente.</p>

      <div className="lockerAccess">
        <h3>{userType === 'client' ? 'Acceso Cliente' : 'Acceso Repartidor'}</h3>
        <div className="inputGroup">
          <label>
            Tipo de Usuario:
            <select onChange={(e) => setUserType(e.target.value)}>
              <option value="client">Cliente</option>
              <option value="delivery">Repartidor</option>
            </select>
          </label>
        </div>
        <div className="inputGroup">
          <label>
            ID del Casillero:
            <input type="text" value={lockerId} onChange={(e) => setLockerId(e.target.value)} />
          </label>
        </div>
        <div className="inputGroup">
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button onClick={handleAccess}>
          {userType === 'client' ? 'Abrir' : 'Cerrar'} Locker
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default HomePage;
