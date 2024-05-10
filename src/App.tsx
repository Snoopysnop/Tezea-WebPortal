import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SidebarComponent from './screens/SidebarComponent';
import KeycloakApi from './api/KeycloakApi';
import { useEffect, useState } from 'react';

function App() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(KeycloakApi.isTokenValid());

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Réduisez l'opacité pour abaisser la luminosité
    zIndex: 999, // Assurez-vous que la superposition est au-dessus de la barre latérale mais en dessous du contenu
    backdropFilter: "blur(8px)", // Floutez le contenu sous l'overlay
    pointerEvents: "none",
  };

  useEffect(() => {
    KeycloakApi.initInstance()
  }, [])

  return (
    <Router>
      {isLoggedIn &&
        <>
          <SidebarComponent setIsLoggedIn={setIsLoggedIn} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

          {sidebarCollapsed ? null : (
            <div
              style={overlayStyle}
            />
          )}
        </>
      }
      <Navigation setIsLoggedIn={setIsLoggedIn}/>
    </Router>
  );
}

export default App;
