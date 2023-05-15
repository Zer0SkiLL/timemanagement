import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import TimeManagement from './components/TimeManagementSite/TimeManagementSite';

function App() {
  const isHere = true;

  return (
    <div className="App">
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{margin: "20px"}}>
          {/* <CheckinCard isHere={isHere} /> */}
          {/* <InfoCard /> */}
          {/* <TaskCard /> */}
          {/* <CommentsCard /> */}
          <TimeManagement />
        </div>
      </div>
    </div>
  );
}

export default App;
