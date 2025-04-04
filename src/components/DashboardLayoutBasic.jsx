import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChurchIcon from '@mui/icons-material/Church'; // Importing church icon
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

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

  const router = useDemoRouter('/home'); // Default path set to /home
  const demoWindow = window ? window() : undefined;

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate load
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: 'Parish Management System',
        logo: <ChurchIcon fontSize="large" />, // Church icon as logo
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {loading ? (
            <>
              <Skeleton variant="text" width={300} height={40} />
              <Grid container spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Grid item xs={12} md={4} key={item}>
                    <Skeleton variant="rectangular" width="100%" height={140} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Welcome to the Parish Management System
              </Typography>
              <Grid container spacing={1}>
                {/* Your grid items */}
              </Grid>
            </>
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
