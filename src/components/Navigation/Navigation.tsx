import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../../screens/LoginPage';
import WorkSitesListStatusPage from '../../screens/WorkSitesListStatusPage';
import WorkSiteRequestPage from '../../screens/WorkSiteRequestPage';
import IncidentsPage from '../../screens/IncidentsPage';
import SettingsPage from '../../screens/SettingsPage';
import WorkSiteDetailPage from '../../screens/WorkSiteDetailPage';
import CreateWorkSitePage from '../../screens/CreateWorkSitePage';
import WorkSiteListPage from '../../screens/WorkSiteListPage';
import SchedulePage from '../../screens/SchedulePage';
import RegisterPage from '../../screens/RegisterPage';
import WorkSiteListRequestPage from '../../screens/WorkSiteListRequestPage';
import { Col, Container, Row } from 'react-bootstrap';
import ProtectedRoute from './ProtectedRoute';
import { Role } from '../../api/Model';

const Navigation: React.FC = () => {
  return (
    <Container className='container-xxl bg'>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<WorkSiteListPage />} />
              <Route path="/listeStatus" element={<WorkSitesListStatusPage />} />
              <Route path="/creerDemande" element={<WorkSiteRequestPage />} />
              <Route path="/incidents" element={<IncidentsPage />} />
              <Route path="/parametres" element={<SettingsPage />} />
              <Route path="/detailChantier" element={<WorkSiteDetailPage />} />
              <Route path="/creerChantier" element={<CreateWorkSitePage />} />
              <Route path="/listeChantiers" element={<WorkSiteListPage />} />
              <Route path="/listeDemandeChantiers" element={<WorkSiteListRequestPage />} />
              <Route path="/planning" element={<SchedulePage />} />
          </Routes>

    </Container>
  );
}

export default Navigation;

