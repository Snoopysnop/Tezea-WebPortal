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

export interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<LoginPageProps> = ({setIsLoggedIn}) => {
  return (
    <Container className='container-xxl'>
      <Row>
        <Col lg='1' className='ps-0 pe-0'></Col>
        <Col className='ps-0 pe-0'>
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
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
            </Route>
          </Routes>
        </Col>
      </Row>

    </Container>
  );
}

export default Navigation;

