import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddSiteModal from '../modal/AddSiteModal';
import "./style.css";

const Site = () => {
  const [sites, setSites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_URL}/api/sites`)
      .then(response => {
        setSites(response.data);
      })
      .catch(error => {
        console.error("Veriler alınamadı:", error);
      });
  }, []);

  const handleAddSite = (newSite) => {
    axios.post(`${import.meta.env.VITE_REACT_URL}/api/sites/save`, newSite)
      .then(response => {
        setSites([...sites, response.data]);
      })
      .catch(error => {
        console.error("Şantiye eklenemedi:", error);
      });
  };

  const handleSiteDelete = (id) => {
    if (confirm("Are you sure you want to delete this construction site?")) {
      axios.delete(`${import.meta.env.VITE_REACT_URL}/api/sites/${id}`)
        .then(() => {
          setSites(sites.filter(site => site.id !== id));
        })
        .catch(error => {
          console.error("Şantiye silinemedi:", error);
        });
    }
  };
  
  const handleSiteClick = (id) => {
    navigate(`/site/${id}/tasks`);
  };

  return (
    <div class="container">

      <div class='top'>
        <h1>CONSTRUCTION SITES</h1>
        <button onClick={() => setIsModalOpen(true)}>ADD NEW CONSTRUCTION SITE</button>
      </div>

      <AddSiteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddSite} 
      />
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan="2">CONSTRUCTION SITE NAME</th>
            </tr>
          </thead>
          <tbody>
            {sites.map(site => (
              <tr key={site.id} >
                <td onClick={() => handleSiteClick(site.id)}>{site.name}</td>
                <td onClick={() => handleSiteDelete(site.id)}>DELETE</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Site;