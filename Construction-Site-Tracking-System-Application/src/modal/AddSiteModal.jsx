import React, { useState } from "react";
import "./modalStyle.css";

const AddSiteModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSite = { name };
    onSubmit(newSite);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>ADD NEW CONSTRUCTION SITE</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <ul>
              <li><label>CONSTRUCTION SITE NAME </label>
              <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            /></li>
            </ul>
            
            
          </div>
          <button type="submit">ADD</button>
          <button type="button" onClick={onClose}>CANCEL</button>
        </form>
      </div>
    </div>
  );
};

export default AddSiteModal;
