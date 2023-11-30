import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams  } from 'react-router-dom';

const LockerUpdate = ({ lockerId }) => {
  const [formData, setFormData] = useState({
    station_id: 0,
    size_width: 0,
    size_height: 0,
    size_length: 0,
    is_first_closure: false,
    status: '',
    state: '',
    is_empty: false,
  });

  const navigate = useNavigate();
  const { locker_id } = useParams();

  useEffect(() => {
    axios.get(`https://backend-p3.vercel.app/lockers/${lockerId}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching locker details:', error);
      });
  }, [lockerId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`https://backend-p3.vercel.app/lockers/${lockerId}/update/`, formData)
      .then(response => {
        console.log('Locker updated:', response.data);
        navigate(`/lockers/${lockerId}`);
      })
      .catch(error => {
        console.error('Error updating locker:', error);
      });
  };

  const handleCancelEdit = () => {
    // Al cancelar, simplemente navegar de nuevo a la vista del locker sin realizar cambios
    navigate(`/lockers/${locker_id}`);
  };

  return (
    <div>
      <h2>Update Locker</h2>
      <form>
        <label>Size Width:</label>
        <input type="number" name="size_width" value={formData.size_width} onChange={handleInputChange} />

        <label>Size Height:</label>
        <input type="number" name="size_height" value={formData.size_height} onChange={handleInputChange} />

        <label>Size Length:</label>
        <input type="number" name="size_length" value={formData.size_length} onChange={handleInputChange} />

        <label>Is First Closure:</label>
        <input type="checkbox" name="is_first_closure" checked={formData.is_first_closure} onChange={() => setFormData({ ...formData, is_first_closure: !formData.is_first_closure })} />

        <label>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} />

        <label>State:</label>
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} />

        <label>Is Empty:</label>
        <input type="checkbox" name="is_empty" checked={formData.is_empty} onChange={() => setFormData({ ...formData, is_empty: !formData.is_empty })} />

        <button type="button" onClick={handleUpdate}>Update Locker</button>
        <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
      </form>
    </div>
  );
};

export default LockerUpdate;
