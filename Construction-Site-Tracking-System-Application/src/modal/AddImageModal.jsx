import React, { useState } from "react";
import "./modalStyle.css";

const AddImageModal = ({ isOpen, onClose, onSubmit, taskId }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    const newImage = {
      imageUrl: imageUrl,
      task: { id: taskId }
    };
    onSubmit(newImage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>ADD NEW IMAGE</h2>
        <div>
        <label>Image URL:</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        </div>
        <button onClick={handleSubmit}>Add Image</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddImageModal;
