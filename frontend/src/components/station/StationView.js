import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StationView = () => {
  const [stationDetails, setStationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { station_id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/stations/${station_id}/`)
      .then(response => {
        console.log(response.data); // Agregamos un log para verificar la respuesta del servidor
        setStationDetails(response.data.station);
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
      {/* Puedes mostrar más detalles según tus necesidades */}
    </div>
  );
};

export default StationView;
