import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import './App.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment.js';
import UserTable from './components/UserTable';
import { userData } from './pageconstants/Constant';
function App() {
  const [inputFeild, setInputField] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });
  const [buttonDisabler, setButtonDisabler] = useState();
  const [dataStorage, setDataStorage] = useState(userData);
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
        <Grid container textAlign="center" spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="h4" textAlign="center" sx={{ mb: 5 }}>Billing Details</Typography>
            <TextField error={errorState.email} helperText={errorState.email && errorHelperText.email} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="email" onBlur={errorHandler} onChange={inputHandler} variant="outlined" size="small" type="email" label="Email Address" id="my-input-email" />
            <TextField error={errorState.firstName} helperText={errorState.firstName && errorHelperText.firstName} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="firstName" onBlur={errorHandler} onChange={inputHandler} variant="outlined" size="small" type="text" label="First Name" id="my-input-first-name" />
            <TextField error={errorState.lastName} helperText={errorState.lastName && errorHelperText.lastName} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} onBlur={errorHandler} name="lastName" onChange={inputHandler} variant="outlined" size="small" type="text" label="Last Name" id="my-input-last-name" />
            <TextField error={errorState.password} helperText={errorState.password && errorHelperText.password} onKeyDown={handleInitialSpace} fullWidth sx={{ mb: 1 }} name="password" onChange={(e)=> {inputHandler(e); errorHandler(e);}} variant="outlined" size="small" type="password" label="Password" id="my-input-password" />
            <Button disabled={buttonDisabler} variant="contained" onClick={dataStorageHandler} sx={{ mt: 2 }}>Submit</Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <UserTable dataStorage={dataStorage}/>
      </Box>
    </>
  );
}
export default App;