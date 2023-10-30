
import axios from 'axios';
import './HomePage.css';
import React, { useState } from 'react';
const HomePage = () => {
    const [userType, setUserType] = useState('delivery');  // Por defecto, lo estableceré para el repartidor
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleAccess = () => {
        const baseEndpoint = `https://backend-p3.vercel.app/locker/`;
        const endpoint = userType === 'delivery' ? `${baseEndpoint}cerrar/4/` : `${baseEndpoint}abrir/4/`;
    
        axios.get(endpoint, {
            pin: pin,
            password: password
        }).then(response => {
            
            setMessage(response.data.message);
        }).catch(error => {
            setMessage('Ocurrió un error al conectar con el servidor.');
        });
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
                        <select onChange={e => setUserType(e.target.value)}>
                            <option value="delivery">Repartidor</option>
                            <option value="client">Cliente</option>
                        </select>
                    </label>
                </div>
                <div className="inputGroup">
                    <label>
                        PIN: 
                        <input type="password" value={pin} onChange={e => setPin(e.target.value)} />
                    </label>
                </div>
                <div className="inputGroup">
                    <label>
                        Contraseña: 
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <button onClick={handleAccess}>{userType === 'delivery' ? 'Cerrar' : 'Abrir'} Locker</button>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default HomePage;