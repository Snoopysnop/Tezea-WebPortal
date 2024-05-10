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

const Navigation: React.FC<{ setIsLoggedIn: any }> = ({ setIsLoggedIn }) => {
  return (
    <Container className='container-xxl bg'>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute roles={[Role.Employee, Role.Commercial, Role.Concierge, Role.SiteChief, Role.WorkSiteChief]} />}>
          <Route path="/" element={<Navigate to={'/worksiteList'} />} />
          <Route path="/incidentsList" element={<IncidentsPage />} />
          <Route path="/worksiteList" element={<WorkSitesListStatusPage />} />
          <Route path="/worksiteDetails" element={<WorkSiteDetailPage />} />
          <Route path="/worksiteCreate" element={<CreateWorkSitePage />} />
          <Route path="/planning" element={<SchedulePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route element={<ProtectedRoute roles={[Role.SiteChief, Role.Concierge]} />}>
          <Route path="/worksiteRequestList" element={<WorkSiteListRequestPage />} />
        </Route >
        <Route element={<ProtectedRoute roles={[Role.Concierge]} />}>

            <Route path="/worksiteRequestCreate" element={<WorkSiteRequestPage />} />
          </Route>

      </Routes>
    </Container>
  );
}

export default Navigation;

