import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/Header";
import { Stack } from '@mui/material';
import styles from "./Profile.module.css";
import backendCall from '../../utils/network';
import { PrimaryBtn, SecondaryBtn, WhiteContainedTextField } from '../../components/StyledMUIElem';

export default function Profile() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');

  const { user } = useAuth();

  const getUserData = async () => {
    try {
      let response = await backendCall.get('/api/v1/user/getUser/' + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      let data = response.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setBio(data.bio);
      if (data.location != null) {
        setLocation(data.location);
      }
      if (user.role === "STUDENT") {
        setGithubUsername(data.githubUsername);
        setLinkedinUsername(data.linkedInUsername);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [user.role]);



  const handleSaveChanges = async () => {
    let profileData = {
      firstName,
      lastName,
      bio,
      address:location
    };
    if (user.role === "STUDENT") {
      profileData = {
        github: githubUsername,
        linkedin: linkedinUsername,
        ...profileData
      }
    }

    try {
      const response = await backendCall.post('/api/v1/user/update',profileData,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      console.log('Profile updated successfully:', response);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }


  };

  const handleReset = () => {
    getUserData();
  };

  return (
    <>
      <Header />
      <Stack className={styles.profileContainer} alignItems="center" flexDirection="column">
        <WhiteContainedTextField width="400px" label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
        <WhiteContainedTextField width="400px" label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        <WhiteContainedTextField multiline={true} width="400px" label="Bio" value={bio} onChange={(event) => setBio(event.target.value)} />
        <WhiteContainedTextField width="400px" label="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
        {user.role === "STUDENT" && (
          <>
            <WhiteContainedTextField width="400px" label="Github Username" value={githubUsername} onChange={(event) => setGithubUsername(event.target.value)} />
            <WhiteContainedTextField width="400px" label="Linkedin Username" value={linkedinUsername} onChange={(event) => setLinkedinUsername(event.target.value)} />
          </>
        )}
        <br />
        <Stack flexDirection="row" className={styles.imageStack} alignItems="center" justifyContent="space-evenly">
          <PrimaryBtn onClick={handleSaveChanges}>Save Changes</PrimaryBtn>
          <SecondaryBtn onClick={handleReset}>Reset</SecondaryBtn>
        </Stack>

      </Stack>
    </>

  );
}
