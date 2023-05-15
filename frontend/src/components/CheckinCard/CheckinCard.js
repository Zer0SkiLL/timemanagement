import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CheckinCard = ({ isHere }) => {
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleCheckInOut = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const entry = isHere ? { checkIn: '', checkOut: time } : { checkIn: time, checkOut: '' };
    setTimes((prevTimes) => [...prevTimes, entry]);
  };

  return (
    <Card style={{ width: '100%', minHeight: 'auto', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="CheckIn"
        subheader={isHere ? 'The Clock is running' : 'see you soon'}
        style={{ backgroundColor: isHere ? '#198754' : '#ff3333', color: 'white' }}
      />
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
        <TableContainer style={{ width: '70%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.checkIn}</TableCell>
                  <TableCell>{entry.checkOut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" flexDirection="column" alignItems="center" style={{ width: '30%', padding: '1rem' }}>
          <Typography variant="body1" style={{ marginBottom: '1rem' }}>
            Current Time:
          </Typography>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} onClick={handleCheckInOut}>
            {isHere ? 'Go' : 'Come'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckinCard;