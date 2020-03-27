import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

function Profile(props) {
  const ngoId = localStorage.getItem('ngoId');
  const ngoName = localStorage.getItem('ngoName');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('profile', {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(response.data);
    }
    fetchData();
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ngoName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(({ id, title, description, value }) => (
          <li key={id}>
            <strong>Caso:</strong>
            <p>{title}</p>
            <strong>Descrição:</strong>
            <p>{description}</p>
            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value)}
            </p>
            <button type="button" onClick={() => handleDeleteIncident(id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
