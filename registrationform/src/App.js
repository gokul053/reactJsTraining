import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Box, Container, Grid } from '@mui/material';
import UserInput from './components/UserInput';
import DataTable from './components/DataTable';

const App = () => {
  return (
    <Box sx={{ flexGrow: 1, background: "linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)" }}>
      <Container>
        <Grid container textAlign="center" minHeight= "100vh" alignItems="center"> 
          <Grid item xs={3} bgcolor={'white'}> 
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
