import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import './LockerStatus.css';

const LockerStatus = () => {
    const [lockers, setLockers] = useState([]);

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
    let lockerState;
    const iotHandler = new AWS.IotData({ endpoint: awsEndpoint });

    useEffect(() => {
        const params = {
            thingName: 'my_esp_lamp' // Reemplaza con el nombre correcto de tu dispositivo AWS IoT
        };

        iotHandler.getThingShadow(params, (err, data) => {
            if (err) {
                console.error('Error al obtener el estado de los lockers desde AWS IoT:', err);
            } else {
                lockerState = JSON.parse(data.payload);
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
    }, []);
// ... (código anterior)
useEffect(() => {
    if (lockerState) {
        axios.get('http://127.0.0.1:8000/lockers/')
            .then(response => {
                const updatedLockers = lockers.map(locker => {
                    const matchingLocker = response.data.find(item => item.locker_id === `l${locker.id}`);
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
    }
}, [lockerState, lockers]);



    return (
        <div className="containerCentered">
            <div className="lockerStatus">
                <h3>Estado de los Lockers</h3>
                <div className="tableWrapper">
                    <table className="lockerTable">
                        <thead>
                            <tr className="tableHeader">
                                <th>Locker ID</th>
                                <th>Estado Candado</th>
                                <th>Estado Puerta</th>
                                <th>Contenido</th>
                                <th>Estado</th>
                                <th>Cliente Email</th>
                                <th>Operador Email</th>
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
}

export default LockerStatus;
