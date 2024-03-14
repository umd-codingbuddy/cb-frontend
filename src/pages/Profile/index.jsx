import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/Header";
import { Avatar, Stack } from '@mui/material';
import styles from "./Profile.module.css";
import backendCall from '../../utils/network';
import { CameraAlt } from '@mui/icons-material';
import { sampleData } from '../../utils/mockData';
import { PrimaryBtn, SecondaryBtn, WhiteContainedTextField } from '../../components/StyledMUIElem';

export default function Profile() {

  const [profileLink, setProfileLink] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const { user } = useAuth();

  useEffect(() => {

    //TODO: replace with actual getUser API
    let response = sampleData['getUser'].response;
    // setProfileLink(response.profileImage);
  }, []);

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  }

  return (
    <>
      <Header />
      <Stack className={styles.profileContainer} alignItems="center" flexDirection="column">
        <h2>Profile Details</h2>
        <Stack flexDirection="row" className={styles.imageStack} alignItems="center" justifyContent="space-evenly">
          <Avatar
            alt="Profile Image"
            src={profileLink}
            sx={{
              width: 100,
              height: 100,
              backgroundColor: profileLink ? 'transparent' : '#ccc',
            }}
          >
            {!profileLink && <CameraAlt />}
          </Avatar>
          <Stack>
            <WhiteContainedTextField width="250px" label="First Name" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
            <WhiteContainedTextField width="250px" label="Last Name" />
          </Stack>
        </Stack>
        <WhiteContainedTextField multiline={true} width="400px" label="Bio" />
        <WhiteContainedTextField width="400px" label="Location" />
        {
          user.role == "student" &&
          <WhiteContainedTextField width="400px" label="Github Username" />
        }
        {
          user.role == "student" &&
          <WhiteContainedTextField width="400px" label="Linkedin Username" />
        }
        <br>
        </br>
        <Stack flexDirection="row" className={styles.imageStack} alignItems="center" justifyContent="space-evenly">
          <PrimaryBtn>Save changes</PrimaryBtn>
          <SecondaryBtn>Reset</SecondaryBtn>
        </Stack>

      </Stack>
    </>

  );
}
