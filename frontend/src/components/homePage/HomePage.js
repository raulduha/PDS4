import './HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';

const HomePage = () => {
  const [userType, setUserType] = useState('client');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [lockerId, setLockerId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AWS.config.update({
      region: 'us-east-2',
      credentials: new AWS.Credentials({
        accessKeyId: 'AKIAU6BRFNUSIDVECJFA',
        secretAccessKey: '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',
      }),
    });
  }, []);

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

    setLoading(true);

    const awsLockerId = `l${lockerNumber}`;
    const iotHandler = new AWS.IotData({ endpoint: 'a56zjhbrqce7l-ats.iot.us-east-2.amazonaws.com' });

    const params = {
      thingName: 'my_esp_lamp',
    };

    iotHandler.getThingShadow(params, (err, data) => {
      setLoading(false);

      if (err) {
        console.error('Error al obtener el estado del locker desde AWS IoT:', err);
        setMessage('Ocurrió un error al conectar con AWS IoT.');
      } else {
        const lockerState = JSON.parse(data.payload);

        // Verificar si el ID del casillero es válido
        const lockersState = Object.keys(lockerState.state.reported.lockers).map(lockerId => ({
          id: lockerId,
          lock: lockerState.state.reported.lockers[lockerId].lock,
          door: lockerState.state.reported.lockers[lockerId].door,
          content: lockerState.state.reported.lockers[lockerId].content
        }));

        if (!lockersState.some(locker => locker.id === awsLockerId)) {
          setMessage('El ID del casillero no es válido.');
          return;
        }

        if (userType === 'client') {
          // Lógica para el cliente (abrir el locker)
          if (lockerState.state.reported.lockers[awsLockerId].lock === 'LOCKED') {
            setMessage('El locker está cerrado. No se puede abrir.');
          } else {
            // El locker está abierto, realizar la solicitud al backend de Django
            const djangoLockerId = `${lockerNumber}`;
            const endpoint = `https://backend-p3.vercel.app/api/locker/abrir/${djangoLockerId}/`;

            axios.post(endpoint, {
              data: {
                locker_id: djangoLockerId,
                password: password,
              },
            })
              .then((response) => {
                setMessage(response.data.message);
              })
              .catch((error) => {
                setMessage('Ocurrió un error al conectar con el servidor.');
              });
          }
        } else if (userType === 'delivery') {
          // Lógica para el repartidor (cerrar el locker)
          if (lockerState.state.reported.lockers[awsLockerId].lock === 'LOCKED') {
            setMessage('El locker ya está cerrado. No se cerrar nuevamente.');
          } else {
            // Verificar si el locker está lleno antes de cerrarlo
            if (lockerState.state.reported.lockers[awsLockerId].content === 'FULL') {
              const djangoLockerId = `${lockerNumber}`;
              console.log(lockerState.state.reported.lockers[awsLockerId].content);
              const endpoint = `https://backend-p3.vercel.app/api/locker/cerrar/${djangoLockerId}/`;
        
              axios.post(endpoint, {
                data: {
                  locker_id: djangoLockerId,
                  password: password,
                },
              })
                .then((response) => {
                  setMessage(response.data.message);
                })
                .catch((error) => {
                  setMessage('Ocurrió un error al conectar con el servidor.');
                });
            } else {
              console.log(lockerState.state.reported.lockers[awsLockerId].content);
              setMessage('El locker no está lleno. No se puede cerrar.');
            }
          }
        }
      }
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
        {loading && <p>Cargando...</p>}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default HomePage;
