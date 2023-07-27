import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #447d52',
    boxShadow: 24,
    p: 4,
};


const FeedbackForm = () => {
    const country = ["India", "USA", "UK", "Canada", "Australia"];
    const[email, setEmail] = useState();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const [fullName, setFullName] = useState();
    const handleFullNameChange = (event) => {
        console.log(event);
        setFullName(event.target.value);
    }
    const [age, setAge] = useState(12);
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }
    const [gender, setGender] = useState();
    const handleGender = (event) => {
        setGender(event.target.value);
    }
    const [feedback, setFeedback] = useState();
    const handleFeedback = (event) => {
        setFeedback(event.target.value);
    }
    const [game, setGame] = useState([]);
    const handleChangeCheckBox = (event) => {
        if(event.target.checked) {
            game.push(event?.target?.name + " ");
            setGame(game);
        }
    }
    const [stateValue, setStateValue] = useState([]);
    const handleCountrySelect = (event) => {
        switch (event.target.value) {
            case "India" : 
                return ["Tamil Nadu","Karnataka","Kerala","Andhra Pradesh"];
            case "USA" :
                return ["Los Angels", "Los Vegas", "Idaho", "Pensylvania"];
            case "UK" :
                return ["London", "Paris", "Italy", "Rome"];
            case "Canada" :
                return ["Ontario", "Manitabo", "Quebec", "Alberta"];
            default :
                return ["Select Country First"];
        }
    }
    console.log(game);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let minAge = 12;
    let ageArr = [11];
    while (minAge <= 60) {
        ageArr.push(minAge);
        minAge++;
    }
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 106,
            },
        },
    };

    return (
        <>
            <Grid sx={{
                background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
                minHeight: '100vh'
            }}>
                <Box sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Typography variant="h4" textAlign="center" sx={{ mb: 5 }}>FeedBack Form</Typography>
                    <Grid container justifyContent="center">
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth size="large">
                                <InputLabel htmlFor="my-input-email">Email address</InputLabel>
                                <Input id="my-input-email" onChange={handleEmailChange}/>
                            </FormControl>
                            <Grid container sx={{ mt: 3 }}>
                                <Grid item xs={9}>
                                    <FormControl fullWidth size="large">
                                        <InputLabel htmlFor="my-input-name">Full Name</InputLabel>
                                        <Input id="my-input-name" onChange={handleFullNameChange} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl sx={{ m: 1, minWidth: 106 }} size="small">
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Age"
                                            MenuProps={MenuProps}
                                            onChange={handleAgeChange}>
                                            {
                                                ageArr.map((newAge) => {
                                                    return (<MenuItem key={newAge} value={newAge} >{newAge}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FormControl sx={{ mt: 3 }}>
                                <FormLabel id="group-radio-gender">Gender</FormLabel>
                                <RadioGroup row aria-labelledby="group-radio-gender" name="gender-radio-group" onChange={handleGender}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                sx={{ marginTop: "20px" }}
                                fullWidth
                                id="filled-select-Country"
                                select
                                label="Country"
                                variant="standard"
                                onChange={setStateValue(handleCountrySelect)}
                            >
                                {country.map((o) => (
                                <MenuItem key={o} value={o}>
                                    {o}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                sx={{ marginTop: "20px" }}
                                fullWidth
                                id="filled-select-State"
                                select
                                label="State"
                                variant="standard"
                            >
                                {stateValue.map((o) => (
                                <MenuItem key={o} value={o}>
                                    {o}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                sx={{ marginTop: "20px" }}
                                fullWidth
                                id="standard-feedback-tab"
                                label="Feedback"
                                multiline
                                rows={3}
                                placeholder="Write your feedback here..."
                                variant="standard"
                                onChange={handleFeedback}
                            />
                            <FormControl component="fieldset" sx={{ mt: 3 }} variant="standard" >
                                <FormLabel component="legend">Games You've Played</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox  onChange={handleChangeCheckBox} name="Genshin Impact" />
                                        }
                                        label="Genshin Impact"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox  onChange={handleChangeCheckBox} name="Counter Strike : GO" />
                                        }
                                        label="Counter Strike : GO"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox  onChange={handleChangeCheckBox} name="Valorant" />
                                        }
                                        label="Valorant"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h6">
                           Full Name : {fullName}
                        </Typography>
                        <Typography variant="h6">
                           Email : {email}
                        </Typography>
                        <Typography variant="h6">
                           Age : {age}
                        </Typography>
                        <Typography variant="h6">
                           Gender : {gender}
                        </Typography>
                        <Typography variant="h6">
                           Feedback : {feedback}
                        </Typography>
                        <Typography variant="h6">
                            {console.log(game)}
                           Games : {
                           game.map((a,i)=> {
                            return(
                                <Typography variant="h6" marginLeft={10}>
                                    {(i+1) +". "+ a}
                                </Typography>
                            )
                           })}
                        </Typography>
                    </Box>
                </Modal>
                <Box textAlign="center">
                    <Button variant="contained" sx={{ my: 5 }} onClick={handleOpen} type="submit">Submit</Button>
                </Box>
            </Grid>
        </>
    )
}
export default FeedbackForm;