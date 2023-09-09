import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import UserInput from './components/UserInput';
import DataTable from './components/DataTable';
import { Rocket, RocketLaunchOutlined } from '@mui/icons-material';

const App = () => {
  return (
    <Box sx={{ flexGrow: 1, background: "linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)" }}>
      <Container>
        <Grid container minHeight= "100vh" alignItems="center" justifyContent="space-around"> 
          <Grid item xs={3} textAlign="center"> 
            <Grid item xs={12}>
              <Rocket sx={{color: "white", fontSize:"150px"}} />
            </Grid>
            <Grid item xs={12}>
              <Typography color={"white"}>Welcome</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ marginTop: "120px", backgroundColor: "white", color:"black", fontWeight:550}}>login</Button>  
            </Grid>
          </Grid>
          <Grid item minHeight={"500px"} xs={9} bgcolor={'white'}>
            <BrowserRouter>
              <Routes>
                <Route path='/data' element={ <DataTable /> } /> 
                <Route path="/" element={ <UserInput /> } />
              </Routes>
            </BrowserRouter>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
