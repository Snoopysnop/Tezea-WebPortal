// Importez Link de react-router-dom
import { Link } from 'react-router-dom';

// Dans votre composant Navbar.tsx, remplacez les MenuItem qui contiennent des liens par des éléments Link

function Navbar() {
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
