// LockerReservation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LockerReservation.css'; // Importar el archivo CSS

const LockerReservation = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/reservations/')
      .then(response => {
        // Ordenar las reservas de más grande a más chico por ID
        const sortedReservations = response.data.sort((a, b) => b.id - a.id);
        setReservations(sortedReservations);
      })
      .catch(error => {
        console.error('Error al obtener la lista de reservas:', error);
      });
  }, []);

  // Función para calcular el tiempo entre dos fechas en minutos
  const calculateTimeDifference = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const difference = (endTime - startTime) / (1000 * 60); // en minutos
    return difference;
  };

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
                <div className="reservation-info">
                  <strong>Email Cliente:</strong> {reservation.email_client}
                </div>
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
                {/* Agrega más detalles según sea necesario */}
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
