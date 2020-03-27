import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

import './styles.css';

function Login(props) {
  const [id, setId] = useState('');
  const { state } = useLocation();
  const history = useHistory();

  async function handleLogin(evt) {
    evt.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      const { name } = response.data;
      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', name);
      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={(state && state.id) || id}
            onChange={evt => setId(evt.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}

export default Login;
