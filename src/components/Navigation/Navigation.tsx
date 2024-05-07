import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../../screens/LoginPage';
import WorkSitesListStatusPage from '../../screens/WorkSitesListStatusPage';
import WorkSiteRequestPage from '../../screens/WorkSiteRequestPage';
import IncidentsPage from '../../screens/IncidentsPage';
import SettingsPage from '../../screens/SettingsPage';
import WorkSiteDetailPage from '../../screens/WorkSiteDetailPage';
import CreateWorkSitePage from '../../screens/CreateWorkSitePage';
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
        <Route path="/" element={<Navigate to={'/worksiteList'} />} />
        <Route path="/worksiteList" element={<WorkSitesListStatusPage />} />
        <Route path="/worksiteRequestCreate" element={<WorkSiteRequestPage />} />
        <Route path="/incidentsList" element={<IncidentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/worksiteDetails" element={<WorkSiteDetailPage />} />
        <Route path="/worksiteCreate" element={<CreateWorkSitePage />} />
        <Route path="/worksiteRequestList" element={<WorkSiteListRequestPage />} />
        <Route path="/planning" element={<SchedulePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Container>
  );
}

export default Navigation;

