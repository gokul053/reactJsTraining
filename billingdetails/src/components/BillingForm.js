import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import UserTable from "./UserTable";
import moment from 'moment/moment.js';
import React, { useEffect, useState } from 'react';
import { userData } from "../pageconstants/Constant";


const BillingForm = () => {
    const [inputFeild, setInputField] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      });
      const [buttonDisabler, setButtonDisabler] = useState(true);
      const [dataStorage, setDataStorage] = useState(userData);
      const [uiSwitcher, setUiSwitcher] = useState(false);
      const [errorState, setErrorState] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false
      });
      const [errorHelperText, setErrorHelperText] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      });
      const errorHandler = (event) => {
        console.log(event);
        switch (event.target.name) {
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputFeild.email)) {
              setErrorState(errorState => ({
                ...errorState,
                email: true
              }));
              setErrorHelperText(helperText => ({
                ...errorHelperText,
                email: "Invalid Email Format"
              }))
            } else {
              setErrorState(errorState => ({
                ...errorState,
                email: false
              }));
            }
            break;
          case "firstName":
            if (event?.target.value?.length > 10) {
              setErrorState(errorState => ({
                ...errorState,
                firstName: true
              }));
              setErrorHelperText(helperText => ({
                ...errorHelperText,
                firstName: "Maximum Character Length is 10"
              }))
            }
            break;
          case "lastName":
            if (event?.target.value?.length > 10) {
              setErrorState(errorState => ({
                ...errorState,
                lastName: true
              }));
              setErrorHelperText(helperText => ({
                ...errorHelperText,
                lastName: "Maximum Character Length is 10"
              }))
            }
            break;
          case "password":
            const hasUppercase = /[A-Z]/;
            const hasLowercase = /[a-z]/;
            const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
            const hasNumber = /\d/;
            if (hasUppercase.test(event?.target?.value) && hasLowercase.test(event?.target?.value) && hasSymbol.test(event?.target?.value) && hasNumber.test(event?.target?.value) ) {
              setErrorState(errorState => ({
                ...errorState,
                password: false
              }));
            } else {
              setErrorState(errorState => ({
                ...errorState,
                password: true
              }));
              setErrorHelperText(helperText => ({
                ...errorHelperText,
                password: "password must contain an Uppercase, lowercase, number and Symbol."
              }))
            }
            break;
          default:
            break;
        }
      }
      const inputHandler = (event) => {
        setInputField({
          ...inputFeild,
          [event.target.name]: event.target.value.trim()
        });
      }
      const dataStorageHandler = (event) => {
        setDataStorage([...dataStorage, {
          serielNumber: Number(dataStorage.length + 1),
          object: inputFeild,
          createdDate: moment().format('MM.DD.YYYY'),
          createdTime: moment().format('hh:mm a')
        }]
        );
        const inputFieldResetArray = ["my-input-email", "my-input-first-name", "my-input-last-name", "my-input-password"];
        inputFieldResetArray.map((field) => {
          document.getElementById(field).value = "";
          return null;
        })
        setInputField({ email: "",
        firstName: "",
        lastName: "",
        password: ""});
        setUiSwitcher(true);
      }
      const handleInitialSpace = (event) => {
        if (event.target?.value?.length === 0 && event.keyCode === 32) {
          event.preventDefault();
        } else if(event.target?.value?.length > 20 && event.keyCode !== 8 && event.keyCode !== 37 && event.keyCode !== 39){
          event.preventDefault();
        }
      }
      useEffect(() => {
        if (errorState.email || errorState.firstName || errorState.lastName || errorState.password ||
        inputFeild?.email?.length === 0 || inputFeild?.firstName?.length === 0 || inputFeild?.lastName?.length === 0 || inputFeild?.password?.length === 0) {
          setButtonDisabler(true);
        } else {
          setButtonDisabler(false);
        }
      }, [errorState,inputFeild])
    return (
        <>
        <Box sx={{ flexGrow: 1, background: "radial-gradient(circle, rgba(174,238,225,1) 36%, rgba(148,233,159,1) 100%)" }}>
        {!uiSwitcher && <Grid container textAlign="center" minHeight= "100vh" alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>Billing Details</Typography>
            <TextField error={errorState.email} helperText={errorState.email && errorHelperText.email} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="email" onBlur={errorHandler} onChange={inputHandler} variant="outlined" size="small" type="email" label="Email Address" id="my-input-email" />
            <TextField error={errorState.firstName} helperText={errorState.firstName && errorHelperText.firstName} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="firstName" onBlur={errorHandler} onChange={inputHandler} variant="outlined" size="small" type="text" label="First Name" id="my-input-first-name" />
            <TextField error={errorState.lastName} helperText={errorState.lastName && errorHelperText.lastName} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} onBlur={errorHandler} name="lastName" onChange={inputHandler} variant="outlined" size="small" type="text" label="Last Name" id="my-input-last-name" />
            <TextField error={errorState.password} helperText={errorState.password && errorHelperText.password} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="password" onChange={(e)=> {inputHandler(e); errorHandler(e);}} variant="outlined" size="small" type="password" label="Password" id="my-input-password" />
            <Button disabled={buttonDisabler} variant="contained" onClick={(e) => {dataStorageHandler(e);}} sx={{ mt: 2 }}>Submit</Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>}
            {uiSwitcher && 
            <Container>
              <Grid container textAlign="center" justifyContent="center" direction="column" minHeight= "100vh" alignItems="center">
                <Grid item border={1}><UserTable dataStorage={dataStorage}/></Grid>
                <Grid item marginTop={"20px"}><Button variant="contained" onClick={()=> {setUiSwitcher(false)}}>Add</Button></Grid>
              </ Grid>
            </Container>
            }
        </Box>
        </>
    )
}

export default BillingForm;