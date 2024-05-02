import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/Create";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/Warning";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WorkSitesListStatusPage from './screens/WorkSitesListStatusPage';
import WorkSiteRequestPage from './screens/WorkSiteRequestPage';
import IncidentsPage from './screens/IncidentsPage';
import SettingsPage from './screens/SettingsPage';
import WorkSiteDetailPage from './screens/WorkSiteDetailPage';
import CreateWorkSitePage from './screens/CreateWorkSitePage';
import WorkSiteListPage from './screens/WorkSiteListPage';
import SchedulePage from './screens/SchedulePage';
import LoginPage from './screens/LoginPage';
// Importez Link de react-router-dom
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div id="app" style={{ position: "relative", display: "flex", backgroundColor: "#f2f2f2" }}> {/* Ajout de la couleur de fond */}
      
        <Sidebar 
          collapsed={sidebarCollapsed} 
          style={{ 
            position: "fixed",
            top: 0, 
            left: 0, 
            height: "100vh",
            zIndex: 1000,
            backgroundColor: "#fff"
          }}
        >
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={toggleSidebar}
              style={{ textAlign: "center" }}
            >
              <h2>{sidebarCollapsed ? null : ''}</h2>
            </MenuItem>

            {/* Menu principal */}
            <MenuItem icon={<HomeOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Accueil'}
            </MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/listeStatus" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Liste des chantiers'}
            </MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Créer une demande'}
            </MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/detailChantier" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Détail d\'un chantier'}
            </MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/incidents" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Incidents'}
            </MenuItem>
            <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}/>}>
                {sidebarCollapsed ? null : 'Planning'}
            </MenuItem>
          </Menu>
        </Sidebar>
        <main style={{ marginLeft: 60, marginTop: 30, flexGrow: 1 }}>
          <Navigation/>
        </main>
      </div>
    </Router>
  );
}

export default App;
