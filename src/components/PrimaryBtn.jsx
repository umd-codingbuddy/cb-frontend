import React, { useEffect, useState } from "react";
import {
    Button
} from "@mui/material";



// import {makeStyles} from "@mui/styles";

const buttonStyle = {
    backgroundColor: '#3A10E5', // Background color
    padding: '8px 20px', // Padding on each side (adjust as needed)
    color: '#fff', // Text color
    borderRadius: '4px', // Optional: Add border radius for rounded corners
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    '&:hover': {
        backgroundColor: '#2c086f', // Darker background color on hover
    },
};

export default function PrimaryBtn({children, ...otherProps}) {
    return (
        <Button {...otherProps} variant="contained" sx={buttonStyle}>{children}</Button>
    );
}