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
            <Routes>
            <Route path="/incidents" element={<Incidents />} />

              <Route path="/liste" element={<Liste />} />
              <Route path="/creer" element={<Creer />} />
              <Route path="/parametres" element={<Parametres />} />
            </Routes>
            <Test />
    </Router>
  );
}

export default App;
