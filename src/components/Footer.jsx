import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Footer = () => {
  const theme = useTheme(); // Access the current theme

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? '#333333' : '#000000', // Darker grey for light mode, black for dark mode
        color: theme.palette.mode === 'light' ? '#ffffff' : '#ffffff', // White text for both modes
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Parish Management System. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Developed by Josephat Sangwa
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;