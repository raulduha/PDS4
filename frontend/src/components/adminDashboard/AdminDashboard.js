import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import OperatorList from './OperatorList';
import OperatorCreate from './OperatorCreate';
import OperatorUpdate from './OperatorUpdate';

const AdminDashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [selectedOperator, setSelectedOperator] = useState(null);

  useEffect(() => {
    // Tu lógica para obtener datos relevantes del dashboard
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

  const handleOperatorClick = (operator) => {
    setSelectedOperator(operator);
    setView('update');
  };

  const handleCreateClick = () => {
    setView('create');
  };

  const handleBackToList = () => {
    setSelectedOperator(null);
    setView('list');
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <button onClick={handleCreateClick}>Crear Operador</button>
      </div>
      {view === 'list' && (
        <OperatorList
          stations={stations}
          onOperatorClick={handleOperatorClick}
        />
      )}
      {view === 'create' && (
        <OperatorCreate
          onBackToList={handleBackToList}
        />
      )}
      {view === 'update' && (
        <OperatorUpdate
          operator={selectedOperator}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
