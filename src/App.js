import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails/CryptoDetails';
import News from './components/News/News';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />

        <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />

        <Route exact path="/news" element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
