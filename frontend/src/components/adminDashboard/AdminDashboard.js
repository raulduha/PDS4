import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí realizarías una petición a tu API para obtener datos relevantes del dashboard
    axios.get('/api/admin/dashboard')
      .then(response => {
        setStations(response.data.stations);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Aquí mostrarías estadísticas, gráficos y otros detalles del sistema */}
      <ul>
        {stations.map(station => (
          <li key={station.id}>
            <strong>{station.name}</strong>
            <p>Total de casilleros: {station.totalLockers}</p>
            <p>Casilleros disponibles: {station.availableLockers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
