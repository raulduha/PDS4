import React, { useState } from 'react';
import './PackageRetrieval.css';

const PackageRetrieval = () => {
  const [packageCode, setPackageCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retrievalResult, setRetrievalResult] = useState('');

  const handleRetrievePackage = () => {
    // Lógica para recuperar el paquete, puedes realizar una llamada a la API aquí
    // y actualizar el estado en consecuencia.
    setIsLoading(true);

    // Ejemplo: Simular una llamada a la API después de 2 segundos
    setTimeout(() => {
      setIsLoading(false);
      setRetrievalResult('¡Paquete recuperado con éxito!');
    }, 2000);
  };

  return (
    <div className="package-retrieval-container">
      <h2>Retiro de Paquete</h2>
      <div>
        <label>Código del Paquete:</label>
        <input
          type="text"
          value={packageCode}
          onChange={(e) => setPackageCode(e.target.value)}
        />
      </div>
      <button onClick={handleRetrievePackage} disabled={isLoading}>
        {isLoading ? 'Recuperando...' : 'Retirar Paquete'}
      </button>
      {retrievalResult && <p className="retrieval-result">{retrievalResult}</p>}
    </div>
  );
};

export default PackageRetrieval;
