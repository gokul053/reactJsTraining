import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';


const FeedbackForm = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {

    };
    let minAge = 12;
    let ageArr = [11];
    while (minAge < 60) {
        ageArr.push(minAge);
        minAge++;
    }
    let genderArray = ["Male", "Female", "Prefer Not to Say"];
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const { gilad, jason, antoine } = state;
    const handleChangeCheckBox = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    return (
        <>
            <Typography variant="h4" textAlign="center">FeedBack Form</Typography>
            <Box sx={{
                marginTop: "40px",
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                minHeight: '100vh',
            }}><Grid container justifyContent="center">
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="large">
                            <InputLabel htmlFor="my-input-email">Email address</InputLabel>
                            <Input id="my-input-email" />
                        </FormControl>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={9}>
                                <FormControl fullWidth size="large">
                                    <InputLabel htmlFor="my-input-name">Full Name</InputLabel>
                                    <Input id="my-input-name" />
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
                                        onChange={handleChange}>
                                        {
                                            ageArr.map((age) => {
                                                return (<MenuItem value={age}>{age}</MenuItem>);
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl sx={{ mt: 3 }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
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
                            defaultValue="others"
                        >
                            {genderArray.map((o) => (
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
                            defaultValue="others"
                        >
                            {genderArray.map((o) => (
                                <MenuItem key={o} value={o}>
                                    {o}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            sx={{ marginTop: "20px" }}
                            fullWidth
                            id="filled-select-City"
                            select
                            label="City"
                            variant="standard"
                            defaultValue="others"
                        >
                            {genderArray.map((o) => (
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
                        />
                        <FormControl required component="fieldset" sx={{ mt: 3 }} variant="standard" >
                            <FormLabel component="legend">Games You've Played(Pick Only Two)</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={gilad} onChange={handleChangeCheckBox} name="gilad" />
                                    }
                                    label="Genshin Impact"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={jason} onChange={handleChangeCheckBox} name="jason" />
                                    }
                                    label="Counter Strike : GO"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={antoine} onChange={handleChangeCheckBox} name="antoine" />
                                    }
                                    label="Valorant"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Box>
            <Box textAlign="center" marginBottom="10%" marginTop="10px">
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </>
    )
}
export default FeedbackForm;