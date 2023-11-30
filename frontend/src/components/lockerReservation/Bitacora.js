import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Bitacora = () => {
  // Access the 'id' parameter from the URL
  const { id } = useParams();

  // State to store bitacora data
  const [bitacoraData, setBitacoraData] = useState(null);

  // Fetch bitacora data when the component mounts
  useEffect(() => {
    // Define an async function to fetch bitacora data
    const fetchBitacoraData = async () => {
      try {
        const response = await axios.get(`https://backend-p3.vercel.app/reservations/${id}`);
        setBitacoraData(response.data);
      } catch (error) {
        console.error('Error fetching bitacora data:', error);
      }
    };

    // Call the async function
    fetchBitacoraData();
  }, [id]); // Make sure to include 'id' as a dependency to re-fetch data when 'id' changes

  // Render loading state or actual bitacora data
  return (
    <div>
      <h2>Bitácora Detalles</h2>
      {bitacoraData ? (
        <div>
          <p>ID: {bitacoraData.id}</p>
          <p>Nombre del Cliente: {bitacoraData.name_client}</p>
          <p>Duración de Reserva: {bitacoraData.duration_time} minutos</p>
          <p>Correo Electrónico del Cliente: {bitacoraData.email_client}</p>
          <p>Fecha de Reserva: {new Date(bitacoraData.reservation_time).toLocaleString()}</p>

          {/* Display Ecommerce information */}
          <p>Ecommerce:</p>
          <ul>
            <li>ID: {bitacoraData.ecommerce.id}</li>
            <li>Nombre: {bitacoraData.ecommerce.name}</li>
            <li>Key: {bitacoraData.ecommerce.key}</li>
          </ul>

          {/* Display Operator information */}
          <p>Operador:</p>
          <ul>
            <li>ID: {bitacoraData.operator.id}</li>
            <li>Nombre: {bitacoraData.operator.name}</li>
            <li>Apellido: {bitacoraData.operator.last_name}</li>
            <li>Correo Electrónico: {bitacoraData.operator.email}</li>
            {/* Add other details as needed */}
          </ul>

          {/* Display State Changes */}
          <p>Historial de Cambios de Estado:</p>
          <ul>
            {bitacoraData.state_changes.map((change, index) => (
              <li key={index}>
                <strong>Estado:</strong> {change.state}, <strong>Timestamp:</strong> {change.timestamp}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Bitacora;

