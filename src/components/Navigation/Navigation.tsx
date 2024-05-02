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

function Navigation() {
  return (
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
  );
}

export default Navigation;

