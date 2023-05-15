import React from 'react';
import { Grid } from '@mui/material';
import TaskCard from '../TasksCard/TasksCard';
import CheckinCard from '../CheckinCard/CheckinCard';
import CommentCard from '../CommentCard/CommentCard';
import InfoCard from '../InfoCard/InfoCard';

const TimeManagement = () => {
  const isHere = true;

  return (    
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CheckinCard isHere={isHere} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <InfoCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TaskCard />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CommentCard />
        </Grid>
      </Grid>
  );
};

export default TimeManagement;
