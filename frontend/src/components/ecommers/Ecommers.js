import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ecommers = () => {
  const [ecommers, setEcommers] = useState([]);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener la lista de e-commers
    axios.get('http://127.0.0.1:8000/ecommerces/')
      .then(response => {
        setEcommers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de e-commers:', error);
      });
  }, [ecommers]); // Agrega ecommers como una dependencia

  const handleCreateEcommer = () => {
    // Llamada a la API para crear un nuevo e-commer
    axios.post('http://127.0.0.1:8000/ecommerces/create/', {
      name: name,
      key: key
    })
      .then(response => {
        // Actualizar la lista de e-commers después de crear uno nuevo
        setEcommers([...ecommers, response.data]);
        // Limpiar los campos de entrada después de la creación
        setName('');
        setKey('');
      })
      .catch(error => {
        console.error('Error al crear un nuevo e-commer:', error);
      });
  };

  const handleDeleteEcommer = (ecommerceId) => {
    // Llamada a la API para eliminar un e-commer
    axios.delete(`http://127.0.0.1:8000/ecommerces/${ecommerceId}/delete/`)
      .then(response => {
        // Actualizar la lista de e-commers después de la eliminación
        setEcommers(ecommers.filter(ecommer => ecommer.id !== ecommerceId));
      })
      .catch(error => {
        console.error('Error al eliminar el e-commer:', error);
      });
  };

  const handleUpdateEcommer = (ecommerceId) => {
    // Lógica para actualizar un e-commer (puedes implementar según tus necesidades)
    // Por ejemplo, podrías mostrar un modal con un formulario de actualización.
    // La implementación específica dependerá de tu diseño y flujo de la aplicación.
  };

  return (
    <div>
      <h2>E-commers</h2>

      {/* Lista de e-commers */}
      <ul>
        {ecommers.map(ecommer => (
          <li key={ecommer.id}>
            {ecommer.name} - {ecommer.key}
            <button onClick={() => handleUpdateEcommer(ecommer.id)}>Actualizar</button>
            <button onClick={() => handleDeleteEcommer(ecommer.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Formulario para crear un nuevo e-commer */}
      <div>
        <label>Nombre del E-commerce:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Clave del E-commerce:</label>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        <button onClick={handleCreateEcommer}>Crear E-commerce</button>
      </div>
    </div>
  );
};

export default Ecommers;
