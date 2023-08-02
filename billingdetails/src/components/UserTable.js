import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const UserTable = ({dataStorage}) => {
    return (
        <>
        <Grid container sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">S. No</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Created Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStorage.map((data => {
                  return (
                    <TableRow>
                      <TableCell align="center">{data.serielNumber}</TableCell>
                      <TableCell align="center">  {data.object.email} </TableCell>
                      <TableCell align="center"> {data.object.firstName} </TableCell>
                      <TableCell align="center">{data.object.lastName}</TableCell>
                      <TableCell align="center">true</TableCell>
                      <TableCell align="center">{data.createdDate}</TableCell>
                      <TableCell align="center">{data.createdTime}</TableCell>
                    </ TableRow>
                  )
                }))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        </>
    )
}

export default UserTable;