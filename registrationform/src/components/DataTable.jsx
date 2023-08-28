// import { Button, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../constants/AppConstants";
import { Button, Popconfirm, Row, Table } from "antd";
import { Container, Grid, IconButton, Pagination } from "@mui/material";
import { Delete, DriveFileRenameOutline, Info } from "@mui/icons-material";
// import { DeleteForever, DriveFileRenameOutline, Edit, Visibility } from "@mui/icons-material";

const DataTable = () => {
  const navigate = useNavigate();
  const tableHeadings = [
    {
      title: "Id",
      width: "10px",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      width: "20px",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-Mail",
      width: "40px",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      width: "20px",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Message",
      width: "20px",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Updated at",
      width: "20px",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Created At",
      width: "20px",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      width: "20px",
      fixed: "right",
      align: "right",
      render: (_, obj) => {
        return (
          <>
            <Popconfirm
              title="Edit the data"
              description="Are you sure to Edit this data?"
              // onConfirm={confirm}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <IconButton size="small">
                <DriveFileRenameOutline />
              </IconButton>
            </Popconfirm>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              // onConfirm={confirm}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <IconButton size="small">
                <Delete />
              </IconButton>
            </Popconfirm>
            <IconButton size="small" onClick={() => handleShowDetails(obj)}>
              <Info />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [tableData, setTableData] = useState([]);
  const [showState, setShowState] = useState({}); console.log(showState);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    current: 1,
    pageSize: 5,
  });
  const handleShowDetails = (obj) => {
    setShowState(obj);
  }
  useEffect(() => {
    axios
      .get(baseurl + `admin/testing/getallusers?page=${currentPage}&size=5`)
      .then((response) => {
        if (response) {
          setPaginationData((previousData) => {
            return {
              ...previousData,
              total: response?.data?.response?.paginationOutput?.totalPages,
              current: Number(response?.data?.response?.paginationOutput?.page),
            };
          });
          setTableData(response?.data?.response?.paginationOutput?.results);
        }
      });
  }, [currentPage]);
  return (
    <>
    <Container>
      <Row type="flex" justify="center" align="middle" style={{minHeight: '500px'}}>
          <Table
            bordered
            footer={() => {
              return (
              <>
                <Grid container marginTop="10px">
                  <Grid item xs={6}>
                    <Pagination  count={paginationData.total} page={currentPage} onChange={
                    (event, size) => {
                      setCurrentPage(size);
                    }
                    } /> 
                  </Grid>
                  <Grid item xs={6} textAlign="end">
                    <Button shape="round" onClick={() => navigate("/")} >Return</Button>
                  </Grid>
                </Grid>
              </>
            ) 
            }}
            pagination={false}
            size="small"
            columns={tableHeadings}
            dataSource={tableData}
            scroll={{ x: 1150 }}
          />
      </Row>
    </Container>
    </>
  );
};

export default DataTable;
