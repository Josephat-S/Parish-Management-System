import * as React from 'react';
import { createTheme } from '@mui/material/styles';
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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/home');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: 'Parish Management System',
        logo: <Church fontSize="large" />, // ✅ Custom logo icon
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {/* ✅ Page content is now loaded from HomePage */}
          <HomePage />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
