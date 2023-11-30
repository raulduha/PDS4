// LockerCreate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LockerCreate.css'; // Ajusta la ruta según tu estructura de carpetas

const LockerCreate = () => {
  const navigate = useNavigate();
  const [sizeWidth, setSizeWidth] = useState('');
  const [sizeHeight, setSizeHeight] = useState('');
  const [sizeLength, setSizeLength] = useState('');
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');

  useEffect(() => {
    // Obtener la lista de estaciones al cargar el componente
    axios.get('http://127.0.0.1:8000/stations/')
      .then(response => {
        setStations(response.data);
        // Establecer la primera estación como la seleccionada por defecto
        if (response.data.length > 0) {
          setSelectedStation(response.data[0].id);
        }
      })
      .catch(error => {
        console.error('Error fetching stations:', error);
      });
  }, []);

  const handleCreateLocker = () => {
    axios
      .post('http://127.0.0.1:8000/lockers/create/', {
        station_id: selectedStation,
        size_width: sizeWidth,
        size_height: sizeHeight,
        size_length: sizeLength,
      })
      .then(response => {
        console.log('Locker created:', response.data);
        // Después de crear un nuevo locker, navegar de nuevo a la vista de la estación
        navigate(`/stations/${selectedStation}`);
      })
      .catch(error => {
        console.error('Error creating locker:', error);
      });
  };

  return (
    <div className="locker-create-container">
      <h2>Create Locker</h2>
      <div>
        <label>Station:</label>
        <select value={selectedStation} onChange={e => setSelectedStation(e.target.value)}>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name} - {station.id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Width:</label>
        <input type="text" value={sizeWidth} onChange={e => setSizeWidth(e.target.value)} />
      </div>
      <div>
        <label>Height:</label>
        <input type="text" value={sizeHeight} onChange={e => setSizeHeight(e.target.value)} />
      </div>
      <div>
        <label>Length:</label>
        <input type="text" value={sizeLength} onChange={e => setSizeLength(e.target.value)} />
      </div>
      <button className="create-button" onClick={handleCreateLocker}>
        Create Locker
      </button>
    </div>
  );
};

export default LockerCreate;
