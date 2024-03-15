import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import styles from "./Contact.module.css";
import { PrimaryBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { InputLabel, MenuItem, Stack } from '@mui/material';

export default function Contact() {

  return (
    <>
      <Header />
      <Stack className={styles.contactContainer} alignItems="center" flexDirection="column">
        <h2>Contact</h2>

        <InputLabel id="ins-label">Select Instructor</InputLabel>
        <WhiteSelect width="400px" id="ins-label">
          <MenuItem value={10}>Sample Instructor</MenuItem>
        </WhiteSelect>
        <br></br>
        <InputLabel id="ins-label">Select Course</InputLabel>
        <WhiteSelect width="400px" label="Select Course">
          <MenuItem value={10}>Sample Course</MenuItem>
        </WhiteSelect>
        <br></br>
        <WhiteContainedTextField multiline={true} width="450px" label="Title" />
        <WhiteContainedTextField multiline={true} width="450px" label="Message" />
        <br>
        </br>
        <Stack flexDirection="row" className={styles.imageStack} alignItems="center" justifyContent="space-evenly">
          <PrimaryBtn>Send Message</PrimaryBtn>
        </Stack>

      </Stack>
    </>

  );
}
