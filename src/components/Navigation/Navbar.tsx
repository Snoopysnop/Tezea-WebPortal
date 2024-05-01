// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/creerDemande">Créer une demande</Link></li>
        <li><Link to="/listeStatus">Liste des chantiers</Link></li>
        <li><Link to="/incidents">Incidents</Link></li>
        <li><Link to="/parametres">Paramètres</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;