import axios from 'axios';
import './HomePage.css';
import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const HomePage = () => {
  const [userType, setUserType] = useState('delivery'); // Por defecto, lo estableceré para el repartidor
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [lockState, setLockState] = useState('UNLOCKED'); // Estado del casillero: LOCKED o UNLOCKED

  useEffect(() => {
    // Esta función se ejecutará cuando cambie userType
    const baseEndpoint = `https://backend-p3.vercel.app/locker/`;
    const endpoint = userType === 'delivery' ? `${baseEndpoint}cerrar/4/` : `${baseEndpoint}abrir/4/`;

    axios
      .get(endpoint, {
        params: {
          pin: pin,
          password: password,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage('Ocurrió un error al conectar con el servidor.');
      });
  }, [userType, pin, password]);

  // Definir iotHandler y responseHandler
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

  function responseHandler(err, data) {
    if (err) {
      console.error('Error updating device shadow:', err);
    } else {
      const newShadow = JSON.parse(data.payload);

      console.log('Device shadow updated:', newShadow);

      updateAppState(newShadow);
    }
  }
  const updateAppState = (newShadow) => {
    // Aquí puedes realizar las acciones necesarias con newShadow
    // Por ejemplo, actualizar el estado del componente
    setLockState(newShadow.state.desired.lockers.l1.lock);
  };
  const handleAccess = () => {
    // Función para abrir o cerrar el casillero
    const newLockState = lockState === 'UNLOCKED' ? 'LOCKED' : 'UNLOCKED';

    const payload = {
      state: {
        desired: {
          lockers: {
            l1: {
              lock: newLockState,
            },
          },
        },
      },
    };

    const params = {
      payload: JSON.stringify(payload),
      thingName: 'my_esp_lamp', // Cambia esto al nombre correcto de tu dispositivo en AWS IoT
    };

    iotHandler.updateThingShadow(params, responseHandler);
  };

  return (
    <div className="homepage">
      <h2>Bienvenido al Sistema de Casilleros</h2>
      <p>Reserva, carga y retira paquetes de manera sencilla y eficiente.</p>

      <div className="lockerAccess">
        <h3>{userType === 'delivery' ? 'Acceso Repartidor' : 'Acceso Cliente'}</h3>
        <div className="inputGroup">
          <label>
            Tipo de Usuario:
            <select onChange={(e) => setUserType(e.target.value)}>
              <option value="delivery">Repartidor</option>
              <option value="client">Cliente</option>
            </select>
          </label>
        </div>
        <div className="inputGroup">
          <label>
            PIN:
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
          </label>
        </div>
        <div className="inputGroup">
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button onClick={handleAccess}>
          {lockState === 'UNLOCKED' ? 'Cerrar' : 'Abrir'} Locker
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default HomePage;
