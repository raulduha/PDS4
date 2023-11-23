import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import OperatorList from './OperatorList';
import OperatorCreate from './OperatorCreate';
import OperatorUpdate from './OperatorUpdate';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [selectedOperator, setSelectedOperator] = useState(null);
  const navigate = useNavigate();
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
    // Utiliza el método `navigate` para redirigir a la ruta de edición con el ID del operador
    navigate(`/editOP/${operator.id}`);
  };

  const handleCreateClick = () => {
    // Utiliza el método `navigate` para redirigir a la ruta de creación
    navigate('/createOP');
  };

  const handleBackToList = () => {
    setSelectedOperator(null);
    setView('list');
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  
return (
  <div className="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <div className="dashboard-actions">
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
