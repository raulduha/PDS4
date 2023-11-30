import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StationView = ({ stationId }) => {
  const [station, setStation] = useState({});
  const [lockers, setLockers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch station details
    axios.get(`http://127.0.0.1:8000/stations/${stationId}/`)
      .then(response => {
        setStation(response.data);
      })
      .catch(error => {
        console.error('Error fetching station details:', error);
      });

    // Fetch lockers for the specific station
    axios.get(`http://127.0.0.1:8000/lockers/?station_id=${stationId}`)
      .then(response => {
        setLockers(response.data);
      })
      .catch(error => {
        console.error('Error fetching lockers:', error);
      });
  }, [stationId]);

  const handleDelete = (lockerId) => {
    axios.delete(`http://127.0.0.1:8000/lockers/${lockerId}/delete/`)
      .then(response => {
        console.log('Locker deleted:', response.data);
        // Refetch lockers after deletion
        axios.get(`http://127.0.0.1:8000/lockers/?station_id=${stationId}`)
          .then(response => {
            setLockers(response.data);
          })
          .catch(error => {
            console.error('Error fetching lockers:', error);
          });
      })
      .catch(error => {
        console.error('Error deleting locker:', error);
      });
  };

  return (
    <div>
      <h2>Station Details</h2>
      <p><strong>ID:</strong> {station.id}</p>
      <p><strong>Name:</strong> {station.name}</p>
      <p><strong>Address:</strong> {station.address}</p>

      <h3>Lockers at this Station</h3>
      <ul>
        {lockers
          .filter(locker => locker.station_id === station.id)
          .map(locker => (
            <li key={locker.id}>
              <strong>Status:</strong> {locker.status}, <strong>Is Empty:</strong> {locker.is_empty ? 'Yes' : 'No'}
              <button onClick={() => handleDelete(locker.id)}>Delete</button>
              <button onClick={() => navigate(`/lockers/${locker.id}/update`)}>Edit</button>
            </li>
          ))}
      </ul>

      <button onClick={() => navigate(`/stations/${stationId}/lockers`)}>View Lockers</button>
      <button onClick={() => navigate(`/stations/${stationId}/update`)}>Edit Station</button>
      <button onClick={() => handleDelete(stationId)}>Delete Station</button>
    </div>
  );
};

export default StationView;
