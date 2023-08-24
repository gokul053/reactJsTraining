// import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { DataGrid, GridActionsCellItem, GridRowModes} from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { baseurl } from "../constants/AppConstants";
import { Box } from '@mui/material';
import moment from 'moment/moment';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';

const DataTable = () => {
    const[rowModesModel, setRowModesModel] = useState([]);
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const handleDeleteClick = (id) => () => {
      
    };
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
    const [paginationModel, setPaginationModel] = useState({
      pageSize: 5,
      page: 0,
    });
    const tableHeadings = [
    { 
      field: 'id',
      headerName: 'S.No',
      type: 'number',
      width: 20
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
    }, 
    {
      field: 'email',
      headerName: 'E-Mail',
      editable: true,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      editable: true,
    },
    {
      field: 'message',
      headerName: 'Message',
      editable: true,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'date',
      valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'date',
      valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if(isInEditMode) {
          return[
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              onClick={handleSaveClick(id)}
              sx={{
                color: 'primary.main',
              }}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              className="textPrimary"
              sx={{
                color: 'primary.main',
              }}
            />
            ];
        }
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            sx={{
              color: 'primary.main',
            }}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick}
            sx={{
              color: 'primary.main',
            }}
          />,
        ];
      }
    }
  ];
  const [tableData, setTableData] = useState([]); 
  useEffect(()=>{
    axios.get(baseurl + "admin/testing/getallusers?page=3&size=5")
    .then((response => {
      console.log(response);
      setTableData(response?.data?.response?.paginationOutput?.results)
    }))
  },[]);
  return (
    <>
    <Box sx={{height: 400, width: '100%' }}>
      <DataGrid
        disableRowSelectionOnClick
        rows={tableData}
        columns={tableHeadings}
        paginationModel = {paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5]}
        onRowModesModelChange={handleRowModesModelChange}
      />
    </Box>
    </>
      // <>
      //   <Container>
      //     <TableContainer variant="elevation" component={Paper}>
      //     <Table size="small" aria-label="simple table">
      //       <TableHead>
      //         <TableRow >
      //         {
      //           tableHeadings.map(heading => {
      //             return (
      //               <TableCell align="center" sx={{textSizeAdjust:"auto"}}>{heading}</TableCell>
      //             )
      //           })}
      //         </TableRow>
      //       </TableHead>
      //       <TableBody>
      //       {tableData?.map((data) => {
      //             return (
      //               <TableRow>
      //                 <TableCell align="center">{data.id}</TableCell>
      //                 <TableCell align="center">  {data.name} </TableCell>
      //                 <TableCell align="center"> {data.email} </TableCell>
      //                 <TableCell align="center">{data.phone_number}</TableCell>
      //                 <TableCell align="center">{data.message}</TableCell>
      //                 <TableCell align="center">{data.createdAt}</TableCell>
      //                 <TableCell align="center">{data.updatedAt}</TableCell>
      //                 <TableCell align="center"><Button>Edit</Button></TableCell>
      //               </ TableRow>
      //             )
      //           })}
      //       </TableBody>
      //     </Table>
      //   </TableContainer>
      //   <Button variant="contained" onClick={() => navigate('/registration')}>Return</Button>
      //   </Container>
      // </>
  );
}

export default DataTable;