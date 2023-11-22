import React, { useState } from 'react';
import axios from 'axios';

const LockerReservation = () => {
  const [size, setSize] = useState('');
  const [reservationId, setReservationId] = useState(null);
  const [message, setMessage] = useState('');

  const handleReservation = () => {
    // Aquí realizarías una petición a tu API para reservar un casillero
    axios.post('/api/locker/reserve', { size })
      .then(response => {
        setReservationId(response.data.reservationId);
        setMessage('¡Reserva exitosa! Tu ID de reserva es: ' + response.data.reservationId);
      })
      .catch(error => {
        console.error('Error making reservation:', error);
        setMessage('Error al realizar la reserva. Por favor, intenta nuevamente.');
      });
  };

  return (
    <div>
      <h2>Locker Reservation</h2>
      <label>
        Tamaño del paquete:
        <input type="text" value={size} onChange={e => setSize(e.target.value)} />
      </label>
      <button onClick={handleReservation}>Reservar Casillero</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LockerReservation;
