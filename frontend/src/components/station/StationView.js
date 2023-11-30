import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StationView = () => {
  const [stationDetails, setStationDetails] = useState({});
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { station_id } = useParams();

  useEffect(() => {
    // Llamada a la API para obtener los detalles de la estación
    axios.get(`http://127.0.0.1:8000/stations/${station_id}/`)
      .then(response => {
        console.log(response.data); // Agregamos un log para verificar la respuesta del servidor
        setStationDetails(response.data.station);
        setLockers(response.data.lockers); // Actualizamos el estado con los lockers
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching station details:', error);
        setLoading(false);
      });
  }, [station_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Station Details</h2>
      <p><strong>ID:</strong> {stationDetails.id}</p>
      <p><strong>Name:</strong> {stationDetails.name}</p>
      <p><strong>Address:</strong> {stationDetails.address}</p>

      <h3>Lockers</h3>
      <ul>
        {lockers.map(locker => (
          <li key={locker.id}>
            <p><strong>ID:</strong> {locker.id}</p>
            {/* Mostrar más detalles del locker según tus necesidades */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StationView;
