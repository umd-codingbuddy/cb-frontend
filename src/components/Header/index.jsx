import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Stack,
    ToggleButtonGroup,
    Typography,
    styled,
} from "@mui/material";
import styles from './header.module.css';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BugReportIcon from '@mui/icons-material/BugReport';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import MuiToggleButton from "@mui/material/ToggleButton";
import { useLocation } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import ReportIssue from '../ReportIssue';

export default function Header() {

    const ToggleButton = styled(MuiToggleButton)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: '#295bcc',
        }
    });
    const location = useLocation();

    const [menu, setMenu] = useState('courses');
    const [role, setRole] = useState('');


    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('role');
        window.location = '/login';
    }

    const handleMenuChange = (value) => {
        if( value!==undefined ){
            window.location = `/${value}`
        }
    };

    useEffect(() => {
        let pathname = location.pathname;
        let pathArray = pathname.split('/');
        let lastSubpath = pathArray[pathArray.length - 1];
        setMenu(lastSubpath);
        let role = window.localStorage.getItem('role');
        setRole(role);

    }, []);

    return (
        <Stack className={styles.headerContainer} flexDirection="row" alignContent="center" justifyContent="space-between">
            <Stack flexDirection="row" justifyContent="stretch">
                <Typography variant='h4' className={styles.title}>AlgoLab</Typography>
                <ToggleButtonGroup
                    value={menu}
                    exclusive
                    onChange={(event)=>{handleMenuChange(event.target.value)}}
                >
                    <ToggleButton value="course" aria-label="left aligned">
                        <LibraryBooksIcon onClick={()=>{handleMenuChange("course")}} />Course
                    </ToggleButton>
                    <ToggleButton value="feedback" aria-label="centered">
                        <FeedbackIcon onClick={()=>{handleMenuChange("feedback")}} /> Feedback
                    </ToggleButton>
                    {
                        role == 'ADMIN' &&
                        <ToggleButton value="issue" aria-label="right aligned">
                            <BugReportIcon onClick={()=>{handleMenuChange("issue")}} /> Issue
                        </ToggleButton>
                    }
                    <ToggleButton value="profile" aria-label="justified">
                        <Person2Icon onClick={()=>{handleMenuChange("profile")}} /> Profile
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack flexDirection="row" justifyContent="center" gap={2}>
                {
                    role !== 'ADMIN' &&
                    <ReportIssue></ReportIssue>
                }

                <Button sx={{ height: "40px" }} variant="contained" onClick={logout}>Logout</Button>
            </Stack>

        </Stack>
    );
}