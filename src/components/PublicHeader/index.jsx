import React, { useEffect, useState } from "react";
import {
    Stack,
} from "@mui/material";

import styles from "./publicHeader.module.css";
export default function PublicHeader() {

    

    return (
        <Stack className={styles.headerContainer} flexDirection="row" alignItems="center" justifyContent="center">
            <img className={styles.headerImage} src="./images/cb-logo.png" width={100} height={70}/>
            <span className={styles.headerText}>Coding Buddy</span>
        </Stack>
    );
}