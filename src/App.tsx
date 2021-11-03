import React, { FC } from 'react';
import './App.scss';
import { Link } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="card-container">
          <p className="happy-birthday-text">FELIZ</p>
          <p className="happy-birthday-text">CUMPLEAÑOS</p>
          <p className="name-text">SUSANA!!!</p>

          <div className="App-link-div">
            <Link className="App-link" to="/linkSospechoso">
              Dale al Link. Tranquila no es un virus 😛
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
