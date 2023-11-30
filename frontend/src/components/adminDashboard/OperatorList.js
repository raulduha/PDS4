import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OperatorList.css';

const OperatorList = ({ stations, onOperatorClick }) => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la lista de operadores al cargar el componente
    axios.get(`https://backend-p3.vercel.app/operators/`)
      .then(response => {
        setOperators(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching operators:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (operatorId) => {
    // Lógica para eliminar el operador
    axios.delete(`https://backend-p3.vercel.app/operators/${operatorId}/delete/`)
      .then(response => {
        console.log('Operador eliminado:', response.data);
        // Actualizar la lista de operadores después de la eliminación si es necesario
        setOperators(operators.filter(operator => operator.id !== operatorId));
      })
      .catch(error => {
        console.error('Error al eliminar el operador:', error);
      });
  };

  if (loading) {
    return <p>Cargando operadores...</p>;
  }

  return (
    <div>
      <h3>Lista de Operadores</h3>
      <ul>
        {operators.length > 0 ? (
          operators.map(operator => (
            <li key={operator.id}>
              <strong>{operator.name} {operator.last_name}</strong>
              <p>Email: {operator.email}</p>
              <button onClick={() => onOperatorClick(operator)}>Actualizar</button>
              <button onClick={() => handleDeleteClick(operator.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No se encontraron operadores.</p>
        )}
      </ul>
    </div>
  );
};

export default OperatorList;
