import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const UserTable = ({dataStorage}) => {
  const tableHeadings = ["S. No", "Email", "First Name", "Last Name", "Password", "Created Date", "Created Time"]
    return (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                  tableHeadings.map(heading => {
                    return (
                      <TableCell align="center">{heading}</TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStorage.map(data => {
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
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default UserTable;