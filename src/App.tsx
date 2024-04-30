import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Test from './screens/test';
import Incidents from './pages/Incidents';
import Creer from './pages/Creer';
import Parametres from './pages/Parametres';
import Liste from './pages/Liste';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          {/* Contenu de la barre latérale */}
          <ul>
            <li><Link to="/liste">Liste</Link></li>
            <li><Link to="/incidents">Incidents</Link></li>
            <li><Link to="/creer">Créer</Link></li>
            <li><Link to="/parametres">Paramètres</Link></li>
          </ul>
        </div>
        <div className="content">
          {/* Contenu principal */}
          <header className="App-header">
            <Routes>
              <Route path="/liste" element={<Liste />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/creer" element={<Creer />} />
              <Route path="/parametres" element={<Parametres />} />
            </Routes>
            <Test />
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
