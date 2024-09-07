import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddImageModal from '../modal/AddImageModal';
import './style.css';

const Image = () => {
  const { taskId } = useParams(); 
  const [images, setImages] = useState([]);
  const [taskName, setTaskName] = useState(''); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_URL}/api/images/task/${taskId}`)
      .then(response => {
        setImages(response.data);
        if (response.data.length > 0) {
          setTaskName(response.data[0].task.name);
        }
      })
      .catch(error => {
        console.error("Görseller alınamadı:", error);
      });
  }, [taskId]);

  const handleAddImage = (newImage) => {
    axios.post(`${import.meta.env.VITE_REACT_URL}/api/images/save`, newImage)
      .then(response => {
        setImages([...images, response.data]);
      })
      .catch(error => {
        console.error("Görsel eklenemedi:", error);
      });
  };

  const handleImageDelete = (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      axios.delete(`${import.meta.env.VITE_REACT_URL}/api/images/${id}`)
        .then(() => {
          setImages(images.filter(image => image.id !== id));
        })
        .catch(error => {
          console.error("Görsel silinemedi:", error);
        });
    }
  };

  return (
    <div>
      <div className="top">
        <h1>Task: {taskName} Images</h1>
        <button onClick={() => navigate(-1)}>GO BACK</button>
        <button onClick={() => setIsModalOpen(true)}>ADD IMAGE</button>
      </div>
      <AddImageModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddImage} 
        taskId={taskId} 
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>DESCRIPTION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 ? (
              <tr>
                <td colSpan="3">No images uploaded yet.</td>
              </tr>
            ) : (
              images.map(image => (
                <tr key={image.id}>
                  <td>
                    <img src={image.imageUrl} alt={`Task ${image.task.name} Image`} />
                  </td>
                  <td>{image.task.description}</td>
                  <td onClick={() => handleImageDelete(image.id)}>DELETE</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Image;
