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

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div id="app" style={{ position: "relative", display: "flex", backgroundColor: "#f5f5f5" }}> {/* Ajout de la couleur de fond gris clair */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          style={{ 
            position: "fixed", // Utiliser `fixed` au lieu de `absolute`
            top: 0, 
            left: 0, 
            height: "100vh", // Utiliser toute la hauteur de la vue
            zIndex: 1000,
            backgroundColor: "#fff" // Couleur de fond de la barre latérale
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
            <MenuItem icon={<HomeOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Accueil'}
              </Link>
            </MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/listeStatus" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Liste des chantiers'}
              </Link>
            </MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }}>
                {sidebarCollapsed ? null : 'Créer une demande'}
              </Link>
            </MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/detailChantier" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Détail d\'un chantier'}
              </Link>
            </MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/incidents" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Incidents'}
              </Link>
            </MenuItem>
            <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ backgroundColor: 'white' }}>
              <Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Planning'}
              </Link>
            </MenuItem>
          </Menu>
        </Sidebar>
        <main style={{ marginLeft: sidebarCollapsed ? 0 : 200, marginTop: 50, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/listeStatus" element={<WorkSitesListStatusPage />} />
            <Route path="/creerDemande" element={<WorkSiteRequestPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/parametres" element={<SettingsPage />} />
            <Route path="/detailChantier" element={<WorkSiteDetailPage />} />

            <Route path="/creerChantier" element={<CreateWorkSitePage />} />

            <Route path="/listeChantiers" element={<WorkSiteListPage />} />
            <Route path="/planning" element={<SchedulePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
