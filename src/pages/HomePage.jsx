import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Skeleton, Grid, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    members: 0,
    events: 0,
    contributions: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setSummaryData({
        members: 120,
        events: 15,
        contributions: 450000,
      });
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Summary Card */}
      <Grid item xs={12} md={6}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Summary
              </Typography>
              {loading ? (
                <>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="70%" />
                </>
              ) : (
                <>
                  <Typography variant="body1">
                    Total Members: {summaryData.members}
                  </Typography>
                  <Typography variant="body1">
                    Total Events: {summaryData.events}
                  </Typography>
                  <Typography variant="body1">
                    Total Contributions: {summaryData.contributions} RWF
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Grid>

      {/* Contributions Overview Card */}
      <Grid item xs={12} md={6}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contributions Overview
              </Typography>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
              ) : (
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 120, label: "Members" },
                        { id: 1, value: 15, label: "Events" },
                        { id: 2, value: 450000, label: "Contributions" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              )}
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
