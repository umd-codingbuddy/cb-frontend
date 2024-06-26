import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    styled,
} from "@mui/material";
import styles from './header.module.css';
import logo from "../../assets/images/cb-logo.png";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BugReportIcon from '@mui/icons-material/BugReport';
import Person2Icon from '@mui/icons-material/Person2';
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../StyledMUIElem";


export default function Header() {

    const navigate = useNavigate();
    const [menu, setMenu] = useState('myCourse');
    const [role, setRole] = useState('');

    const { user, logout } = useAuth();
    const location = useLocation();




    const handleMenuChange = (value) => {
        if (value !== undefined) {
            navigate(`/${value}`);
        }
    };

    useEffect(() => {
        let pathname = location.pathname;
        let pathArray = pathname.split('/');
        let lastSubpath = pathArray[pathArray.length - 1];
        setMenu(lastSubpath);
        if (user != null) {
            setRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <Stack className={styles.headerContainer} flexDirection="row" alignItems="center" justifyContent="left">
            <Stack className={styles.logoContainer} flexDirection="row" alignItems="center" justifyContent="center">
                <img className={styles.headerImage} src={logo} width={80} height={50} />
                <span className={styles.headerText}>Coding Buddy</span>
            </Stack>
            <Stack flexDirection="row" justifyContent="stretch">
                <ToggleButtonGroup
                    value={menu}
                    exclusive
                    className={styles.menuContainer}
                    onChange={(event) => { handleMenuChange(event.target.value) }}
                >
                    {
                        user.role == "ADMIN" &&
                        <ToggleButton value="users" aria-label="left aligned"
                            style={{
                                color: menu === 'users' ? 'white' : 'black',
                                border: "1px solid #111",
                                backgroundColor: menu === 'users' ? '#2c086f' : 'transparent',
                            }}
                        >
                            Users
                        </ToggleButton>

                    }

                    <ToggleButton value="allCourse" aria-label="centered"
                        style={{
                            color: menu === 'allCourse' ? 'white' : 'black',
                            border: "1px solid #111",
                            backgroundColor: menu === 'allCourse' ? '#2c086f' : 'transparent',
                        }}
                    >
                        All Courses
                    </ToggleButton>

                    {
                        user.role != "ADMIN" &&
                        <ToggleButton value="myCourse" aria-label="left aligned"
                            style={{
                                color: menu === 'myCourse' ? 'white' : 'black',
                                border: "1px solid #111",
                                backgroundColor: menu === 'myCourse' ? '#2c086f' : 'transparent',
                            }}
                        >
                            My Courses
                        </ToggleButton>

                    }

                    {
                        user.role != "ADMIN" &&
                        <ToggleButton value="contact" aria-label="right aligned"
                            style={{
                                color: menu === 'contact' ? 'white' : 'black',
                                border: "1px solid #111",
                                backgroundColor: menu === 'contact' ? '#2c086f' : 'transparent',
                            }}
                        >
                            Contact
                        </ToggleButton>

                    }
                    {
                        user.role != "ADMIN" &&
                        <ToggleButton value="profile" aria-label="justified"
                            style={{
                                color: menu === 'profile' ? 'white' : 'black',
                                border: "1px solid #111",
                                backgroundColor: menu === 'profile' ? '#2c086f' : 'transparent',
                            }}
                        >
                            Profile
                        </ToggleButton>

                    }




                </ToggleButtonGroup>
            </Stack>

            <Stack className={styles.logoutBtnContainer} flexDirection="row" alignItems="center" justifyContent="center" gap={2}>
                <PrimaryBtn sx={{ height: "40px" }} variant="contained" onClick={handleLogout}>Logout</PrimaryBtn>
            </Stack>

        </Stack>
    );
}