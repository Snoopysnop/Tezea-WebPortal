import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Navbar from './components/Navigation/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          {/* Contenu de la barre latérale */}
          <Navbar />
        </div>
        <div className="content">
          {/* Contenu principal */}
          <header className="App-">
            <Navigation />
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
