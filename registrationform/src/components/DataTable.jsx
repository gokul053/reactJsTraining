import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../constants/AppConstants";
import { Button, Input, Modal, Popconfirm, Row, Table} from "antd";
import { Container, Grid, IconButton, Pagination, Typography } from "@mui/material";
import { Delete, DriveFileRenameOutline, Info } from "@mui/icons-material";

const DataTable = () => {
  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewData, setViewData] = useState({});
  const handleView = (obj) => {
    setViewData({...viewData,
      id: obj.id,
      name: obj.name,
      email: obj.email,
      phone_number: obj.phone_number,
      message: obj.message,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    })
  }
  const handleDelete = (id) => {
    axios
      .delete(
        `https://fts-backend.onrender.com/admin/testing/deleteUserById?id=${id}`
        
      )
      .then((response) => {
        setRefreshState(refreshState + 1);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  };
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
              onConfirm={() => {console.log("Came in"); setModalVisible(true); handleView(obj)}}
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
              onConfirm={() => handleDelete(obj.id)}
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
  const [showState, setShowState] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    current: 1,
    pageSize: 5,
  });
  const handleShowDetails = (obj) => {
    setShowState(obj);
  };
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
  }, [currentPage, refreshState]);
  return (
    <>
      <Container>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "500px" }}
        >
          <Table
            bordered
            footer={() => {
              return (
                <>
                  <Grid container marginTop="10px">
                    <Grid item xs={6}>
                      <Pagination
                        count={paginationData.total}
                        page={currentPage}
                        onChange={(event, size) => {
                          setCurrentPage(size);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} textAlign="end">
                      <Button type="primary" onClick={() => navigate("/")}>
                        Return
                      </Button>
                    </Grid>
                  </Grid>
                </>
              );
            }}
            pagination={false}
            size="small"
            columns={tableHeadings}
            dataSource={tableData}
            scroll={{ x: 1150 }}
          />
        </Row>
        <Modal
          title="Detailed View"
          style={{ left: 120 }}
          centered
          open={modalVisible} 
          // onOk={() => this.setModal2Visible(false)}
          onCancel={() => {setModalVisible(false);setViewData({})}}
        >
          <Typography fontSize="13px" fontWeight={700}>Name</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.name} />
          <Typography fontSize="13px" fontWeight={700}>E-Mail</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.email} />
          <Typography fontSize="13px" fontWeight={700}>Phone Number</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.phone_number} />
          <Typography fontSize="13px" fontWeight={700}>Message</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.message} />
          <Typography fontSize="13px" fontWeight={700}>Created At</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.createdAt} />
          <Typography fontSize="13px" fontWeight={700}>Updated At</Typography>
          <Input style={{marginBottom: "10px"}} defaultValue={viewData.updatedAt} />
        </Modal>
      </Container>
    </>
  );
};

export default DataTable;
