import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone_number:"",
        message:""
    });
    const handleUserInput = (event) => {
        console.log(event);
        setUser({ ...user,
            [event.target.name]: event.target.value
        });
    } 
    return(
        <>
            <Grid container minHeight="500px" textAlign="center" alignItems="center">
                <Grid items xs={3}></Grid>
                <Grid items xs={6}>
                    <Typography marginBottom="20px" variant="h4">Register Here</Typography>
                    <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="name" label="Name" />
                    <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="email" label="Email" />
                    <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="phone_number" label="Phone Number" />
                    <TextField fullWidth sx={{mb:2}} size="small" onChange={handleUserInput} variant="outlined" name="message" label="Message" />
                    <Button variant="contained" sx={{mx:1}} onClick={() => navigate('/data')}>Submit</Button>
                    <Button variant="contained" sx={{mx:1}} onClick={() => navigate('/data')}>Show Table</Button>
                </Grid>
                <Grid items xs={3}></Grid>
            </Grid>
        </> 
    );
}

export default UserInput;