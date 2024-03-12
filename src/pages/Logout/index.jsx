import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {  useNavigate } from 'react-router-dom';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Logout({ setLoggedIn }) {

    const navigate = useNavigate();
    useEffect(() => {
        window.localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login',{state:{isLogOut:true}});
    }, []);

    return (
        <>
            <Box></Box>
        </>

    );
}
