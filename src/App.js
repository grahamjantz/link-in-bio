import React from 'react';
import './App.css';
import Footer from './features/Footer/Footer';
import Header from './features/Header/Header';
import Links from './features/Links/Links';

function App() {
  return (
    <div className="App">
      <Header />
      <Links />
      <Footer />
    </div>
  );
}

export default App;
