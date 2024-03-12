import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Box, Typography, Container } from '@mui/material';

import MuiAlert from '@mui/material/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import backendCall from '../../utils/network';
import { sampleData } from '../../utils/mockData';
import { useAuth } from "../../hooks/useAuth";
import PublicHeader from '../../components/PublicHeader';
import styles from "./login.module.css";

import PrimaryBtn from '../../components/PrimaryBtn';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ setLoggedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [snackType, setSnackType] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { login, user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const signin = async (event) => {
    event.preventDefault();
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // await backendCall.post('/api/v1/login', {
    //   email: email,
    //   password: password,
    // }).then((res) => {
    //   // window.localStorage.setItem('token', res.data.token);
    //   window.localStorage.setItem('token', res.data.token);
    //   window.localStorage.setItem('role', res.data.role);
    //   setLoggedIn(true);
    //   navigate('/course', {
    //     state: {
    //       isLoginSuccessful: true
    //     }
    //   });
    //   // window.location = '/outing';
    // }).catch((err) => {
    //   console.log('login error : ', err);
    //   if (err.response && err.response.data && err.response.data.error) {
    //     setMessage(err.response.data.error);
    //     setSnackType('error');
    //     setIsSnackbarOpen(true);
    //   }
    // });
    let response = sampleData['login'].response;

    if (response.status == 1) {
      login(response.token);
      // window.localStorage.setItem('token', response.token);
      // window.location = '/home';
    } else if (response.status == 2) {
      setSnackType('error');
      setMessage(response.errorMsg);
      setIsSnackbarOpen(true);
    }


  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  const handleLogoutMessage = () => {
    setSnackType('success');
    setMessage('You logged out successfully.');
    setIsSnackbarOpen(true);
  }

  const handleLoginNecessaryMessage = () => {
    setSnackType('warning');
    setMessage('You must login to access the application.');
    setIsSnackbarOpen(true);
  }

  const showRegistrationSuccessMessage = () => {
    setSnackType('success');
    setMessage('User is registered successfully.');
    setIsSnackbarOpen(true);
  }

  const handleRegisterBtn = ()=>{
    navigate("/register");
  }

  useEffect(() => {
    let navigationState = location.state;
    if (navigationState == "logout") {
      handleLogoutMessage();
      window.history.replaceState({}, '')
    } else if (navigationState == "loginNecessary") {
      handleLoginNecessaryMessage();
      window.history.replaceState({}, '')
    }
    if (user != null) {
      navigate("/home");
    }
  }, [])

  return (

    <>
      <PublicHeader />
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <Typography variant="h5" sx={{
          margin: "15px"
        }}>Login to Coding Buddy</Typography>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="Email"
            value={email}
            sx={{ width: "400px" }}
            onChange={onEmailChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            sx={{ width: "400px" }}
            required
          />
          <br /><br />

          {/* <PrimaryBtn onClick={handleRegisterBtn}>Sign up</PrimaryBtn> */}
          
          <PrimaryBtn
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={email === '' || password === ''}
            onClick={signin}
            sx={{ padding: "10px 20px" }}
          >
            Login
          </PrimaryBtn>
          <div>
            <p>
              Don't have an account?{' '}
              <Link to="/register">
                <span className={styles.customLink}>Sign up for free</span>
              </Link>
            </p>
          </div>
        </div>

      </Box>
      <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
        <Alert severity={snackType} onClose={hanldeSnackbarClose}>{message}</Alert>
      </Snackbar>

    </>

  );
}
