import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import './LockerStatus.css';

// Componente para manejar los datos de AWS IoT
const AWSSection = ({ setLockers }) => {
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

    useEffect(() => {
        const params = {
            thingName: 'my_esp_lamp' // Reemplaza con el nombre correcto de tu dispositivo AWS IoT
        };

        iotHandler.getThingShadow(params, (err, data) => {
            if (err) {
                console.error('Error al obtener el estado de los lockers desde AWS IoT:', err);
            } else {
                const lockerState = JSON.parse(data.payload);
                const lockersState = Object.keys(lockerState.state.reported.lockers).map(lockerId => {
                    const localId = parseInt(lockerId.replace('l', '')); // Convierte el ID de AWS a ID local
                    return {
                        id: localId,
                        lock: lockerState.state.reported.lockers[lockerId].lock,
                        door: lockerState.state.reported.lockers[lockerId].door,
                        content: lockerState.state.reported.lockers[lockerId].content
                    };
                });

                setLockers(lockersState);
            }
        });
    }, [setLockers]);

    return null; // No se renderiza nada en el DOM
};

// Componente principal que muestra los datos combinados de AWS y Vercel
const LockerStatus = () => {
    const [lockers, setLockers] = useState([]);

    useEffect(() => {
        axios.get('https://backend-p3.vercel.app/lockers/')
            .then(response => {
                console.log('Respuesta del servidor:', response.data);

                const updatedLockers = lockers.map(locker => {
                    const matchingLocker = response.data.find(item => {
                        // Comparar sin tener en cuenta el prefijo "l" en AWS
                        const awsLockerId = `l${locker.id}`;
                        return item.locker_id === awsLockerId;
                    });
                    return {
                        ...locker,
                        client_email: matchingLocker ? matchingLocker.client_email : 'N/A',
                        operator_email: matchingLocker ? matchingLocker.operator_email : 'N/A',
                        locker_status: matchingLocker ? 'Disponible' : 'N/A'
                    };
                });
                setLockers(updatedLockers);
            })
            .catch(error => {
                console.error('Error al obtener datos desde el servidor:', error);
            });
    }, [lockers]);

    return (
        <div className="containerCentered">
            <div className="lockerStatus">
                <h3>Estado de los Lockers</h3>
                <AWSSection setLockers={setLockers} />
                <div className="tableWrapper">
                    <table className="lockerTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>Locker_ID</th>
                                <th>Estado_Candado</th>
                                <th>Estado_Puerta</th>
                                <th>Contenido</th>
                                <th>Estado</th>
                                <th>Cliente_Email</th>
                                <th>Operador_Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lockers.map(locker => (
                                <tr key={locker.id} className="lockerItem">
                                    <td>{locker.id}</td>
                                    <td>{locker.lock}</td>
                                    <td>{locker.door}</td>
                                    <td>{locker.content}</td>
                                    <td>{locker.locker_status}</td>
                                    <td>{locker.client_email}</td>
                                    <td>{locker.operator_email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
                            };

export default LockerStatus;
