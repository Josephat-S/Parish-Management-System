import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Skeleton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState({
    members: 0,
    events: 0,
    contributions: 0,
    chartData: [],
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setOverviewData({
        members: 120,
        events: 15,
        contributions: 5000,
        chartData: [
          { name: 'January', contributions: 800 },
          { name: 'February', contributions: 1200 },
          { name: 'March', contributions: 1500 },
          { name: 'April', contributions: 1000 },
        ],
      });
      setLoading(false);
    }, 2000); // Simulate 2 seconds of loading
  }, []);

  const renderSkeleton = () => (
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ my: 2 }} />
  );

  const renderOverviewCard = (title, value) => (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      {loading ? (
        <Skeleton variant="text" width="60%" height={40} />
      ) : (
        <>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
          <Typography variant="h4" color="primary">
            {value}
          </Typography>
        </>
      )}
    </Paper>
  );

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={overviewData.chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="contributions" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Parish Management System
        </Typography>
        <Typography variant="body1" paragraph>
          The Parish Management System is designed to streamline and simplify the administration of parish activities, 
          events, and member management. Below is an overview of the system's key metrics and performance.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid item xs={12} sm={4}>
          {renderOverviewCard('Total Members', overviewData.members)}
        </Grid>
        <Grid item xs={12} sm={4}>
          {renderOverviewCard('Total Events', overviewData.events)}
        </Grid>
        <Grid item xs={12} sm={4}>
          {renderOverviewCard('Total Contributions', `$${overviewData.contributions}`)}
        </Grid>
      </Grid>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contributions Overview
        </Typography>
        {loading ? renderSkeleton() : renderChart()}
      </Box>
    </Container>
  );
};

export default HomePage;
