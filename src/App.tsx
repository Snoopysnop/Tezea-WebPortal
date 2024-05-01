import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
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

// Dans votre composant App, remplacez les MenuItem qui contiennent des liens par des éléments Link

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div id="app" style={{ display: "flex" }}>
        <Sidebar collapsed={sidebarCollapsed} style={{ height: "100vh" }}>
          <Menu>
            <MenuItem
              icon={<MenuOutlinedIcon />}
              onClick={toggleSidebar}
              style={{ textAlign: "center" }}
            >
              <h2>{sidebarCollapsed ? null : ''}</h2>
            </MenuItem>

            {/* Menu principal */}
            <MenuItem icon={<HomeOutlinedIcon />}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Home'}
              </Link>
            </MenuItem>
            <MenuItem icon={<PeopleOutlinedIcon />}>
              <Link to="/listeStatus" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Liste des chantiers'}
              </Link>
            </MenuItem>
            <MenuItem icon={<ContactsOutlinedIcon />}>
              <Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }}>
                {sidebarCollapsed ? null : 'Créer une demande'}
              </Link>
            </MenuItem>
            <MenuItem icon={<ReceiptOutlinedIcon />}>
              <Link to="/detailChantier" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Détail d\'un chantier'}
              </Link>
            </MenuItem>
            <MenuItem icon={<HelpOutlineOutlinedIcon />}>
              <Link to="/incidents" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Incidents'}
              </Link>
            </MenuItem>
            <MenuItem icon={<CalendarTodayOutlinedIcon />}>
              <Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black' , textDecoration: 'none'}}>
                {sidebarCollapsed ? null : 'Planning'}
              </Link>
            </MenuItem>
          </Menu>
        </Sidebar>
        <main>
          <h1 style={{ color: "white", marginLeft: "5rem" }}>
            React-Pro-Sidebar
          </h1>
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
