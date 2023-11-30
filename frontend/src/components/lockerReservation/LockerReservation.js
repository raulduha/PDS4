// LockerReservation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde react-router-dom
import './LockerReservation.css'; // Importar el archivo CSS

const LockerReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`https://backend-p3.vercel.app/reservations/`)
      .then(response => {
        // Filtrar solo las reservas (por ejemplo, si las reservas de lockers tienen un campo específico)
        const reservationsOnly = response.data.filter(item => item.hasOwnProperty('name_client'));
        
        // Ordenar las reservas de más grande a más chico por ID
        const sortedReservations = reservationsOnly.sort((a, b) => b.id - a.id);
        setReservations(sortedReservations);
      })
      .catch(error => {
        console.error('Error al obtener la lista de reservas:', error);
      });
  }, []);

  return (
    <div className="reservation-container">
      <h2>Lista de Reservas</h2>
      {reservations.length === 0 ? (
        <p>No hay reservas disponibles.</p>
      ) : (
        <ul className="reservation-list">
          {reservations.map(reservation => (
            <li key={reservation.id} className="reservation-item">
              <div className="reservation-details">
                <div className="reservation-info">
                  <strong>ID:</strong> {reservation.id}
                </div>
                <div className="reservation-info">
                  <strong>Cliente:</strong> {reservation.name_client}
                </div>
                {/* Otros detalles de la reserva */}
                <div className="reservation-info">
                  <strong>Confirmada:</strong> {reservation.is_confirmed ? 'Sí' : 'No'}
                </div>
                <div className="reservation-info">
                  <strong>Retirada:</strong> {reservation.is_retired ? 'Sí' : 'No'}
                </div>
                <div className="reservation-info">
                  <strong>Fecha de Reserva:</strong> {new Date(reservation.reservation_time).toLocaleString()}
                </div>
                <div className="reservation-info">
                  <strong>Duración de Reserva:</strong> {reservation.duration_time} minutos
                </div>
                {/* Botón para ir a la bitácora */}
                <Link to={`/bitacora/${reservation.id}`}>
                  <button>Bitácora</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Estructura básica para gráficos en el dashboard */}
      <div className="dashboard">
        <h2>Dashboard</h2>
        {/* Agrega aquí los gráficos y métricas según tus necesidades */}
      </div>
    </div>
  );
};

export default LockerReservation;
