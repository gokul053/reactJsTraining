import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const tableHeadings = ["Id","Name", "Email", "Phone Number", "Message", "Updated At", "Created At"];
  const navigate = useNavigate();
    return (
        <>
          <Container>
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
                    <></>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" onClick={() => navigate('/registration')}>Return</Button>
          </Container>
        </>
    );
}

export default DataTable;