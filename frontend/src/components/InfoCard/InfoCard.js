import React from 'react';
import { Card, CardHeader, CardContent, Divider, Typography, Box, Grid } from '@mui/material';

const InfoCard = () => {

    const getTimeBackgroundColor = () => {
        // Your logic to determine the background color based on value
        // Return the desired background color based on the value
        return '#ff0000'; // Red color as an example
      };

  return (
    <Card style={{ width: '100%', minHeight: 'auto' }}>
        <CardHeader
            title="Info"
        />
        <Divider sx={{ my: 1 }} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
                Soll:
              </Typography>
              <Typography variant="h5">8:24</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
                Feierabend am:
              </Typography>
              <Typography variant="h5">17:30</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
                Ist:
              </Typography>
              <Typography variant="h5">2:25</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box>
              <Typography variant="subtitle1" style={{ marginBottom: '0.5rem' }}>
                Feierabend in:
              </Typography>
              <Typography variant="h5" sx={{ backgroundColor: getTimeBackgroundColor()}}>6:06</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
