import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AddTaskModal from "../modal/AddTaskModal";
import "./style.css";
const Task = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/tasks/site/${id}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("Görevler alınamadı", error);
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/sites')
      .then(response => {
        const selectedSite = response.data.find(site => site.id === parseInt(id));
        if (selectedSite) {
          setSiteName(selectedSite.name);
        }
      })
      .catch(error => {
        console.error("Siteler alınamadı:", error);
      });
  }, [id]);

  const handleTaskDelete = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://localhost:8080/api/tasks/${id}`)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
          console.error("Görev silinemedi:", error);
        });
    }
  };

  const handleAddTask = (newTask) => {
    axios.post("http://localhost:8080/api/tasks/save", newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.error("Görev eklenemedi:", error);
      });
  };

  const handleTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <div>
      <div class="top">
      <h2>{siteName} SITE TASKS</h2>
      <button onClick={() => navigate(-1)}>GO BACK</button>
      <button onClick={() => setIsModalOpen(true)}>ADD NEW TASK</button>
      </div>
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddTask}
        siteId={id} 
      />

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>INTERACTION</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3">THERE IS NO TASK YET</td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr className="table-row" key={task.id}>
                  <td className="name-column" onClick={() => handleTaskClick(task.id)}>{task.name}</td>
                  <td className="description-column" onClick={() => handleTaskClick(task.id)}>{task.description}</td>
                  <td className="delete-column" onClick={() => handleTaskDelete(task.id)}>DELETE</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
