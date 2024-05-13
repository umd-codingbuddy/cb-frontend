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
import styles from './PageHeader.module.css';
import logo from "../../assets/images/cb-logo.png";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../StyledMUIElem";


export default function PageHeader() {

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
        <Box>
            <Stack className={styles.headerContainer} flexDirection="row" alignItems="center" justifyContent="left">
                <Stack className={styles.logoContainer} flexDirection="row" alignItems="center" justifyContent="center">
                    <img className={styles.headerImage} src={logo} width={80} height={50} />
                </Stack>
                <Stack flexDirection="row" justifyContent="stretch">
                    <ToggleButtonGroup
                        value={menu}
                        exclusive
                        className={styles.menuContainer}
                        onChange={(event) => { handleMenuChange(event.target.value) }}
                    >
                        <ToggleButton value="myCourse" className={styles.menuBtn} style={{ color: "white" }} aria-label="left aligned">
                            My Courses
                        </ToggleButton>
                        {/* <ToggleButton value="courseOutline" style={{ color: "white" }} aria-label="centered">
                            Syllabus
                        </ToggleButton> */}
                    </ToggleButtonGroup>
                </Stack>

                <Stack className={styles.logoutBtnContainer} flexDirection="row" alignItems="center" justifyContent="center" gap={2}>
                    <PrimaryBtn sx={{ height: "40px" }} variant="contained" onClick={handleLogout}>Logout</PrimaryBtn>
                </Stack>

            </Stack>

        </Box>

    );
}