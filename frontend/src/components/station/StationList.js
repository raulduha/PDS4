import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [lockerCounts, setLockerCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-p3.vercel.app/stations/')
      .then(response => {
        setStations(response.data);

        const promises = response.data.map(station => (
          axios.get(`https://backend-p3.vercel.app/lockers/?station_id=${station.id}`)
        ));

        Promise.all(promises)
          .then(lockersResponses => {
            const counts = lockersResponses.map(response => response.data.length);
            const countsMap = {};
            response.data.forEach((station, index) => {
              countsMap[station.id] = counts[index];
            });
            setLockerCounts(countsMap);
          })
          .catch(error => {
            console.error('Error fetching locker counts:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching stations:', error);
      });
  }, []);

  const handleDelete = (stationId) => {
    axios.delete(`https://backend-p3.vercel.app/stations/${stationId}/delete/`)
      .then(response => {
        console.log('Station deleted:', response.data);
        setStations(stations.filter(station => station.id !== stationId));
      })
      .catch(error => {
        console.error('Error deleting station:', error);
      });
  };

  return (
    <div>
      <h2>Station List</h2>
      <ul>
        {stations.map(station => (
          <li key={station.id}>
            <strong>ID:</strong> {station.id}, <strong>Name:</strong> {station.name}, <strong>Address:</strong> {station.address}

            <button onClick={() => navigate(`/stations/${station.id}/`)}>View</button>
            <button onClick={() => navigate(`/stations/${station.id}/update`)}>Edit</button>
            <button onClick={() => handleDelete(station.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/stations/create')}>Create Station</button>
    </div>
  );
};

export default StationList;
