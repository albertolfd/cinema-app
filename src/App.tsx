import React, { FC } from 'react';
import ballons from 'ballons.png';
import partyPopper from 'party-popper.png';
import './App.css';
import { Link } from 'react-router-dom';

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="card-container">
          <img src={ballons} alt="ballons" className="ballons2" />
          <img src={ballons} alt="ballons" className="ballons1" />
          <p className="happy-birthday-text">FELIZ</p>
          <p className="happy-birthday-text">CUMPLEAÑOS</p>
          <p className="name-text">SUSANA!!!</p>
          <img src={partyPopper} alt="party-popper" className="party-popper1" />
          <img src={partyPopper} alt="party-popper" className="party-popper2" />
          <img src={partyPopper} alt="party-popper" className="party-popper3" />
          <img src={partyPopper} alt="party-popper" className="party-popper4" />

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
