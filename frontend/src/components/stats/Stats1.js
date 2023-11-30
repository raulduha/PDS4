import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const StationCharts = ({ stationId }) => {
  const [stationInfo, setStationInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-p3.vercel.app/station/info/actual/1/`);
        setStationInfo(response.data);
      } catch (error) {
        console.error('Error fetching station info:', error);
      }
    };

    fetchData();
  }, [stationId]);

  if (!stationInfo) {
    return <div>Loading...</div>;
  }

  // Data for the charts
  const dataUsage = [
    { name: 'Daily porcentaje de uso casilleros', value: stationInfo.usage_percentage },
  ];

  const dataReservationToLoading = [
    { name: 'Promedio entre reservar y carga paquete (Min)', value: stationInfo.avg_time_reservation_to_loading },
  ];

  const dataLoadingToPickup = [
    { name: 'Promedio entre carga paquete y retiro (Min)', value: stationInfo.avg_time_loading_to_pickup },
  ];

  return (
    <div>
      <h2>Station Charts</h2>

      <div>
        <BarChart
          width={400}
          height={200}
          data={dataUsage}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </div>

      <div>
        <BarChart
          width={400}
          height={200}
          data={dataReservationToLoading}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </div>

      <div>
        <BarChart
          width={400}
          height={200}
          data={dataLoadingToPickup}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#ffc658">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default StationCharts;
