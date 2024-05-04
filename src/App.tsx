import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Sidebar } from 'react-pro-sidebar';
import SidebarComponent from './screens/SidebarComponent';
import { Col, Container, Row } from 'react-bootstrap';

function App() {


  return (
    <Router>

        <SidebarComponent/>

          <Navigation/>


    </Router>
  );
}

export default App;
