import { useEffect, useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import axios from 'axios';
import baseurl from './constants/AppConstants';
import { Container } from '@mui/material';

function App() {
  const [dataStorage, setDataStorage] = useState([]);
  useEffect( async () => {
   await axios.get(baseurl + "admin/testing/getallusers?offset=0&limit=10")
        .then((response)=> {
          if(response) {
            setDataStorage(response?.data?.response?.paginationOutput?.items);
          }
  })
  },[]);
  return (
    <>
    <Container border={1} bor sx={{ padding:"50px",borderRadius:"3%", borderColor:"black"}}>
      <DataTable dataStorage={dataStorage} />
    </Container>
    </>
  );
}

export default App;
