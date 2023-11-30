import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LockerReservation.css';

const LockerReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [hasDelays, setHasDelays] = useState(false);

  useEffect(() => {
    // Obtener la lista de reservas al cargar la vista
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    axios.get(`https://backend-p3.vercel.app/reservations/`)
      .then(response => {
        const reservationsOnly = response.data.filter(item => item.hasOwnProperty('name_client'));
        const sortedReservations = reservationsOnly.sort((a, b) => b.id - a.id);
        setReservations(sortedReservations);

        // Llamar a la función para verificar el endpoint de alerta después de 1 segundo
        setTimeout(() => {
          handleAlertCheck(sortedReservations);
        }, 1000);
      })
      .catch(error => {
        console.error('Error al obtener la lista de reservas:', error);
      });
  };

  const handleAlertCheck = async (reservationsList) => {
    try {
      // Verificar el endpoint de alerta
      const alertResponse = await axios.get('https://backend-p3.vercel.app/alert-long-pending-reservations/');
      
      // Actualizar el estado según la respuesta
      setHasDelays(alertResponse.data.length > 0);
      
      // Mostrar un mensaje dependiendo de si hay datos en la respuesta
      if (alertResponse.data.length > 0) {
        alert(`¡Alerta! Se encontraron atrasos: ${JSON.stringify(alertResponse.data)}`);
        console.log('Datos de la alerta:', alertResponse.data);
      } else {
        alert('No hay atrasos por el momento.');
      }
    } catch (error) {
      console.error('Error al verificar el endpoint de alerta:', error);
    }
  };
  

  return (
    <div className="reservation-container">
      <h2>Lista de Reservas</h2>

      {/* Botón para verificar atrasos */}
      <button onClick={handleAlertCheck}>Verificar Atrasos</button>

      {reservations.length === 0 ? (
        <p>No hay reservas disponibles. {hasDelays ? 'Hay atrasos por el momento.' : 'No hay atrasos por el momento.'}</p>
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
