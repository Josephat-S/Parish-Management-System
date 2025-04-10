import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Church } from '@mui/icons-material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import HomePage from '../pages/HomePage';
import MembersPage from '../pages/MembersPage';
import EventsPage from '../pages/EventsPage';
import ContributionsPage from '../pages/ContributionsPage';
import ReportsPage from '../pages/ReportsPage';
import Footer from './Footer'; // Import the Footer component

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'home',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'members',
    title: 'Members',
    icon: <PeopleIcon />,
  },
  {
    segment: 'events',
    title: 'Events',
    icon: <EventIcon />,
  },
  {
    segment: 'contributions',
    title: 'Contributions',
    icon: <AttachMoneyIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const demoWindow = window ? window() : undefined;

  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          title: 'Parish Management System',
          logo: <Church fontSize="large" />, // ✅ Custom logo icon
        }}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <PageContainer>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/contributions" element={<ContributionsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="*" element={<HomePage />} /> {/* Fallback route */}
            </Routes>
          </PageContainer>
          <Footer /> {/* Add Footer here */}
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
