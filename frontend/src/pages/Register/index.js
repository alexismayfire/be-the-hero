import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(evt) {
    evt.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      state,
    };

    try {
      const response = await api.post('ngos', data);
      const { id } = response.data;
      alert(`Seu ID de acesso: ${id}`);
      history.push('/', { id });
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Já me cadastrei
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={evt => setWhatsapp(evt.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={evt => setCity(evt.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={state}
              onChange={evt => setState(evt.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
