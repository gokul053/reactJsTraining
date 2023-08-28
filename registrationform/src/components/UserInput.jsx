import { Box, Container, Grid, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../constants/AppConstants";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { Button } from "antd";
import logo from "../assets/hero.png";

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const UserInput = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone_number:"",
        message:""
    });
    const handleUserInput = (event) => {
        setUser({ ...user,
            [event.target.name]: event.target.value
        });
    } 
    const handleSubmit = (event) => {
        handleOpen();
    }
    const handlePostData = (event) => {
        axios.post(baseurl + "user/newRegistration", user)
        .then((response)=> {
            console.log(response);
            if(response.status === 200) {
                toast.success(response?.data?.response?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                handleClose();
            } 
        }).catch((e)=>{
            toast.error(e?.response?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            handleClose();
        })
    }
    return(
        <>
            <Container>
                <Grid container minHeight="500px" textAlign="center" alignItems="center">
                    <Grid items xs={6}>
                        <div style={{marginBottom: "100px"}}>
                            <img src = {logo} width="300px" alt="register here"  />
                        </div>
                    </Grid>
                    <Grid items xs={6}>
                        <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="name" label="Name" />
                        <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="email" label="Email" />
                        <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="phone_number" label="Phone Number" />
                        <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="message" label="Message" />
                        <Button  onClick={handleSubmit}>Submit</Button>
                        <Button  onClick={() => navigate('/data')}>Show Table</Button>
                        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Are you sure want to Submit?
                            </Typography>
                            <Box textAlign="end" marginTop="30px">
                                <Button onClick={handleClose}>Cancel</Button><Button onClick={handlePostData}>Ok</Button>
                            </Box>
                            </Box>
                        </Modal>
                        <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="colored" />
                    </Grid>
                </Grid>
            </Container>
        </> 
    );
}

export default UserInput;