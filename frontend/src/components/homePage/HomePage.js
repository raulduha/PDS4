// import './HomePage.css';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import {
//   IoTDataPlaneClient,
// } from "@aws-sdk/client-iot-data-plane"

// import { STSClient } from "@aws-sdk/client-sts"

// const HomePage = () => {
//   const [userType, setUserType] = useState('client');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [lockerId, setLockerId] = useState('');
//   const [loading, setLoading] = useState(false);

//   // AWS configuration
// //   useEffect(() => {
// //     AWS.config.update({
// //       region: 'us-east-2',
// //       credentials:({
// //         accessKeyId: 'AKIAU6BRFNUSIDVECJFA',
// //         secretAccessKey: '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',
// //       }),
// //     });
// //   }, []);

// //   // Function to update device shadow based on lock value
// //   const updateDeviceShadow = (awsLockerId, lockValue) => {
// //     const iotHandler = new AWS.IotData({ endpoint: 'a56zjhbrqce7l-ats.iot.us-east-2.amazonaws.com' });

// //     const payload = {
// //       state: {
// //         desired: {
// //           lockers: {
// //             [awsLockerId]: {
// //               lock: lockValue,
// //             },
// //           },
// //         },
// //       },
// //     };

// //     const params = {
// //       payload: JSON.stringify(payload),
// //       thingName: 'my_esp_lamp',
// //     };

// //     iotHandler.updateThingShadow(params, (err, data) => {
// //       if (err) {
// //         console.error('Error updating device shadow:', err);
// //       } else {
// //         const newShadow = JSON.parse(data.payload);
// //         console.log('Device shadow updated:', newShadow);
// //       }
// //     });
// //   };

// // // Function to handle user access
// // const handleAccess = () => {
// //   if (password === '') {
// //     setMessage('Por favor, ingresa una contraseña.');
// //     return;
// //   }

// //   if (!lockerId) {
// //     setMessage('Debes proporcionar un ID de casillero.');
// //     return;
// //   }

// //   const lockerNumber = parseInt(lockerId);

// //   if (lockerNumber < 1 || lockerNumber > 3) {
// //     setMessage('El ID del casillero debe estar entre 1 y 3.');
// //     return;
// //   }

// //   setLoading(true);

// //   const awsLockerId = `l${lockerNumber}`;
// //   const iotHandler = new AWS.IotData({ endpoint: 'a56zjhbrqce7l-ats.iot.us-east-2.amazonaws.com' });

// //   const params = {
// //     thingName: 'my_esp_lamp',
// //   };

// //   iotHandler.getThingShadow(params, (err, data) => {
// //     setLoading(false);

// //     if (err) {
// //       console.error('Error al obtener el estado del locker desde AWS IoT:', err);
// //       setMessage('Ocurrió un error al conectar con AWS IoT.');
// //     } else {
// //       const lockerState = JSON.parse(data.payload);

// //       // Verificar si el ID del casillero es válido
// //       const lockersState = Object.keys(lockerState.state.reported.lockers).map(lockerId => ({
// //         id: lockerId,
// //         lock: lockerState.state.reported.lockers[lockerId].lock,
// //         door: lockerState.state.reported.lockers[lockerId].door,
// //         content: lockerState.state.reported.lockers[lockerId].content
// //       }));

// //       if (!lockersState.some(locker => locker.id === awsLockerId)) {
// //         setMessage('El ID del casillero no es válido.');
// //         return;
// //       }

// //       // Realizar la solicitud al backend de Django
// //       const djangoLockerId = `${lockerNumber}`;
// //       const endpoint = `http://127.0.0.1:8000/locker/${userType === 'client' ? 'abrir' : 'cerrar'}/${djangoLockerId}/${password}/`;

// //       axios.post(endpoint)
// //         .then((response) => {
// //           setMessage('Operación en progreso. Por favor, espere...'); // Mensaje de carga constante
// //           // Update device shadow after a successful request
// //           updateDeviceShadow(awsLockerId, userType === 'client' ? 'UNLOCKED' : 'LOCKED');

// //           // Wait for 6 seconds and check the lock status
// //           setTimeout(() => {
// //             checkLockStatus(awsLockerId);
// //           }, 6000);
// //         })
// //         .catch((error) => {
// //           setMessage('Ocurrió un error al conectar con el servidor. Asegurate de haber colocado las credenciales correctamente.');
// //         })
// //         .finally(() => {
// //           setLoading(false); // Asegurarse de que el estado de carga se establezca en "false" incluso si hay un error
// //         });
// //     }
// //   });
// // };

//   // Function to check the lock status every 6 seconds
// // ... (resto del código)

// // Function to check the lock status every 6 seconds
// // const checkLockStatus = (awsLockerId, retryCount = 0) => {
// //   const maxRetries = 10; // Número máximo de intentos

// //   const interval = setInterval(() => {
// //     const iotHandler = new AWS.IotData({ endpoint: 'a56zjhbrqce7l-ats.iot.us-east-2.amazonaws.com' });
// //     const params = {
// //       thingName: 'my_esp_lamp',
// //     };

// //     iotHandler.getThingShadow(params, (err, data) => {
// //       if (err) {
// //         console.error('Error al obtener el estado del locker desde AWS IoT:', err);
// //       } else {
// //         const lockerState = JSON.parse(data.payload);
// //         const currentLockStatus = lockerState.state.reported.lockers[awsLockerId].lock;

// //         if (userType === 'client' && currentLockStatus === 'UNLOCKED') {
// //           setMessage('Abierto exitosamente.');
// //           clearInterval(interval);
// //         } else if (userType === 'delivery' && currentLockStatus === 'LOCKED') {
// //           setMessage('Cerrado correctamente. Coloca un objeto y verifica la cerradura.');
// //           clearInterval(interval);
// //         } else {
// //           setMessage('Operación en progreso. Por favor, espere...');
          
// //           // Si ha superado el número máximo de intentos, mostrar un mensaje y salir del intervalo
// //           if (retryCount >= maxRetries) {
// //             setMessage('El locker no se cerró o abrió exitosamente después de varios intentos.');
// //             clearInterval(interval);
// //           }
// //         }
        
// //         // Actualizar el dispositivo sombra después de cada verificación
// //         updateDeviceShadow(awsLockerId, userType === 'client' ? 'UNLOCKED' : 'LOCKED');
// //       }
// //     });
// //   }, 6000);
// // };




//   return (
//     <div className="homepage">
//       <h2>Bienvenido al Sistema de Casilleros</h2>
//       <p>Reserva, carga y retira paquetes de manera sencilla y eficiente.</p>

//       <div className="lockerAccess">
//         <h3>{userType === 'client' ? 'Acceso Cliente' : 'Acceso Repartidor'}</h3>
//         <div className="inputGroup">
//           <label>
//             Tipo de Usuario:
//             <select onChange={(e) => setUserType(e.target.value)}>
//               <option value="client">Cliente</option>
//               <option value="delivery">Repartidor</option>
//             </select>
//           </label>
//         </div>
//         <div className="inputGroup">
//           <label>
//             ID del Casillero:
//             <input type="text" value={lockerId} onChange={(e) => setLockerId(e.target.value)} />
//           </label>
//         </div>
//         <div className="inputGroup">
//           <label>
//             Contraseña:
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </label>
//         </div>
//         <button onClick={handleAccess}>
//           {userType === 'client' ? 'Abrir' : 'Cerrar'} Locker
//         </button>
//         {loading && <p>Cargando...</p>}
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
