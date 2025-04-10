import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Parish Management System. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Developed by Josephat Sangwa
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;