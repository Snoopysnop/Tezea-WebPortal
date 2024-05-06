import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Sidebar } from 'react-pro-sidebar';
import SidebarComponent from './screens/SidebarComponent';
import { Col, Container, Row } from 'react-bootstrap';
import KeycloakApi from './api/KeycloakApi';
import MainApi from './api/MainApi';
import { useEffect, useState } from 'react';

function App() {

KeycloakApi.initInstance()
const [isLoggedIn, setIsLoggedIn] = useState(KeycloakApi.isTokenValid());
useEffect(() => {
  if(isLoggedIn && localStorage.getItem("access-token")) {
    MainApi.initInstance(localStorage.getItem("access-token")!)
  }
}, [])

  return (
    <Router>
        {isLoggedIn &&
          <SidebarComponent/>
        }
          <Navigation setIsLoggedIn={setIsLoggedIn}/>


    </Router>
  );
}

export default App;
