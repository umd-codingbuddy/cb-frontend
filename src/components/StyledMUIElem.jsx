import { Button, Select, TextField } from "@mui/material";


export const WhiteContainedTextField = (props) => {
    return (
        <TextField
            {...props}
            variant="filled"
            sx={{
                '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                    margin: '10px 0px',
                    width: props.width,
                },
            }}
        />
    );
};

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

export const PrimaryBtn = ({ children, ...props }) => {
    return (
        <Button {...props} variant="contained" sx={buttonStyle}>{children}</Button>
    );
}

const SecbuttonStyle = {
    backgroundColor: '#555', // Background color
    padding: '8px 20px', // Padding on each side (adjust as needed)
    color: '#fff', // Text color
    borderRadius: '4px', // Optional: Add border radius for rounded corners
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    '&:hover': {
        backgroundColor: '#333', // Darker background color on hover
    },
};

export const SecondaryBtn = ({ children, ...props }) => {
    return (
        <Button {...props} variant="contained" sx={SecbuttonStyle}>{children}</Button>
    );
}

const TransparentbuttonStyle = {
    background: 'transparent', // Background color
    padding: '8px 20px', // Padding on each side (adjust as needed)
    color: '#3A10E5', // Text color
    borderRadius: '4px', // Optional: Add border radius for rounded corners
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    boxShadow : "none",
    '&:hover': {
        color: '#2c086f', // Darker background color on hover
        textDecoration:"underline",
        background: 'transparent',
        boxShadow : "none"
    },
};

export const TransparentBtn = ({ children, ...props }) => {
    return (
        <Button {...props} variant="contained" sx={TransparentbuttonStyle}>{children}</Button>
    );
}

export const WhiteSelect = ({ children, ...props }) => {
    return (
        <Select
            {...props}
            sx={{
                '& .MuiSelect-select': {
                    backgroundColor: 'white',
                    width: props.width,
                    color:"black"
                },
            }}
        >
            {children}
        </Select>
    );
};