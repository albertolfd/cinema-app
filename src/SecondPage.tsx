import React, { FC } from 'react';
import cake from 'cake.png';
import './SecondPage.css';

const SecondPage: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="card-container">
          <p className="happy-birthday-text1">Espero que tengas</p>
          <p className="happy-birthday-text2">un buen día</p>
          <p className="happy-birthday-text3">con tu familia</p>
          <img src={cake} className="App-logo" alt="logo" />
        </div>
      </header>
    </div>
  );
};

export default SecondPage;
