import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LockerStatus.css';

const LockerStatus = () => {
    const [lockers, setLockers] = useState([]);

    useEffect(() => {
        axios.get('https://backend-p3.vercel.app/lockers/disponibles/')
            .then(response => {
                setLockers(response.data);
            }).catch(error => {
                console.error('Error al obtener el estado de los lockers:', error);
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
                            {locker.state === "Cerrado" ? (
                                <span className="lockerClosed">❌ Cerrado</span>
                            ) : (
                                <span className="lockerOpen">✅ Abierto</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LockerStatus;
