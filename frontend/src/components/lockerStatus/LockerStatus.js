import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import './LockerStatus.css';

// Componente para manejar los datos de AWS IoT
const AWSSection = ({ setAWSLockers }) => {
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
                    const localId = parseInt(lockerId.replace('', '')); // Convierte el ID de AWS a ID local
                    return {
                        id: localId,
                        lock: lockerState.state.reported.lockers[lockerId].lock,
                        door: lockerState.state.reported.lockers[lockerId].door,
                        content: lockerState.state.reported.lockers[lockerId].content
                    };
                });

                setAWSLockers(lockersState);
            }
        });
    }, [setAWSLockers]);

    return null; // No se renderiza nada en el DOM
};

// Componente principal que muestra los datos de Vercel
const LockerStatus = () => {
    const [AWSLockers, setAWSLockers] = useState([]);
    const [VercelLockers, setVercelLockers] = useState([]);

    useEffect(() => {
        axios.get('https://backend-p3.vercel.app/lockers/')
            .then(response => {
                console.log('Respuesta del servidor (Vercel):', response.data);
                setVercelLockers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos desde el servidor:', error);
            });
    }, []);

    return (
        <div className="containerCentered">
            <div className="lockerStatus">
                <h3>Estado de los Lockers (AWS)</h3>
                <AWSSection setAWSLockers={setAWSLockers} />
                <div className="tableWrapper">
                    <table className="lockerTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>Locker ID</th>
                                <th>Estado Candado</th>
                                <th>Estado Puerta</th>
                                <th>Contenido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AWSLockers.map(locker => (
                                <tr key={locker.id} className="lockerItem">
                                    <td>{locker.id}</td>
                                    <td>{locker.lock}</td>
                                    <td>{locker.door}</td>
                                    <td>{locker.content}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="lockerStatus">
                <h3>Estado de los Lockers (Vercel)</h3>
                <div className="tableWrapper">
                    <table className="lockerTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>Locker ID</th>
                                <th>Estados</th>
                                <th>Cliente Email</th>
                                <th>Operador Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VercelLockers.map(locker => (
                                <tr key={locker.locker_id} className="lockerItem">
                                    <td>{locker.locker_id}</td>
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
