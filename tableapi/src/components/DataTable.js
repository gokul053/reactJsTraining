import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const DataTable = ({dataStorage}) => {
    const tableHeadings = ["Id","Name", "Email", "Phone Number", "Message", "Updated At", "Created At"];
    console.log(dataStorage, "Hello");
    return (
        <>
          <TableContainer variant="outlined" component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow >
                  {
                  tableHeadings.map(heading => {
                    return (
                      <TableCell align="center" sx={{textSizeAdjust:"auto"}}>{heading}</TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataStorage?.map((data,index) => {
                  return (
                    <TableRow>
                      <TableCell align="center">{data?.id}</TableCell>
                      <TableCell align="center">  {data?.name} </TableCell>
                      <TableCell align="center"> {data?.email} </TableCell>
                      <TableCell align="center">{data?.phone_number}</TableCell>
                      <TableCell align="center">{data?.message}</TableCell>
                      <TableCell align="center">{data?.updatedAt}</TableCell>
                      <TableCell align="center">{data?.createdAt}</TableCell>
                    </ TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default DataTable;