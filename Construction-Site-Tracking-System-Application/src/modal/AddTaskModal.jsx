import React, { useState } from "react";
import "./modalStyle.css";

const AddTaskModal = ({ isOpen, onClose, onSubmit, siteId }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      site: { id: siteId }
    };
    onSubmit(newTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>ADD NEW TASK</h2>
        <div>
          <ul>
            <li><label>Name:</label>
              <input 
                type="text" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)} />
            </li>
            <li>
              <label>Description:</label>
              <input 
                type="text" 
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)} />
            </li>
          </ul>
        
        
        </div>
        <button onClick={handleSubmit}>Add Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
