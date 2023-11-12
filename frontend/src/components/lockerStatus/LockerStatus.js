import React, { useState, useEffect } from 'react';
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

    const iotHandler = new AWS.IotData({ endpoint: awsEndpoint });

    useEffect(() => {
        const params = {
            thingName: 'my_esp_lamp' // Reemplaza con el nombre correcto de tu dispositivo AWS IoT
        };

        iotHandler.getThingShadow(params, (err, data) => {
            if (err) {
                console.error('Error al obtener el estado de los lockers desde AWS IoT:', err);
            } else {
                const newShadow = JSON.parse(data.payload);

                const lockersState = Object.keys(newShadow.state.reported.lockers).map(lockerId => ({
                    id: lockerId,
                    lock: newShadow.state.reported.lockers[lockerId].lock,
                    door: newShadow.state.reported.lockers[lockerId].door,
                    content: newShadow.state.reported.lockers[lockerId].content
                }));

                setLockers(lockersState);
            }
        });
    }, []);

    return (
        <div className="containerCentered">
            <div className="lockerStatus">
                <h3>Estado de los Lockers</h3>
                <ul className="lockerList">
                    {lockers.map(locker => (
                        <li key={locker.id} className="lockerItem">
                            <span>Locker #{locker.id}:</span>
                            <span>Estado del Candado: {locker.lock}</span>
                            <span>Estado de la Puerta: {locker.door}</span>
                            <span>Contenido: {locker.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LockerStatus;
