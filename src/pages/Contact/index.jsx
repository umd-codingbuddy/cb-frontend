import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import styles from "./Contact.module.css";
import { PrimaryBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { Box, InputLabel, MenuItem, Stack } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';

export default function Contact() {

  const { user } = useAuth();
  const [insMessages, setInsMessages] = useState([]);
  const [curMessage, setCurMessage] = useState(null);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const isUserStudent = () => {
    return user.role == "student";
  }

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  }

  useEffect(() => {
    let response = sampleData['getContactMessages'].response;
    if (isUserInstructor()) {
      setInsMessages(response);
    }
  }, []);

  const showMessageContent = (id) => {
    let curMessage = insMessages.filter((msg) => msg.id === id);
    setCurMessage(curMessage[0]);
  }

  return (
    <>
      <Header />
      {
        isUserStudent() &&
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
      }

      {
        isUserInstructor() &&
        <Stack className={styles.messageContainer} alignItems="center" flexDirection="row">
          <Stack className={styles.messagePreviewContainer} flexDirection="column" flex="wrap">
            {
              insMessages.map((message) => {
                return (
                  <Box className={styles.messageTile} key={message.id} onClick={() => { showMessageContent(message.id) }}>
                    <div className={styles.messagePreviewDateText}>{convertTimestampToDate(message.createdAt)}</div>
                    <div className={styles.messagePreviewNameText}>{message.student.name}</div>
                    <div className={styles.messagePreviewTitleText}>{message.title}</div>
                    <div className={styles.messagePreviewContentText}>{message.message}</div>
                  </Box>
                )
              })
            }
          </Stack>

          <Stack className={styles.messageContentContainer} flexDirection="column" flex="wrap">
            {
              curMessage == null &&
              <div>Select a message to show its content</div>
            }
            {
              curMessage !== null &&
              <>
                <div className={styles.messagePreviewDateText}>{convertTimestampToDate(curMessage.createdAt)}</div>
                <div className={styles.messagePreviewNameText}>{curMessage.student.name}</div>
                <div className={styles.messagePreviewTitleText}>{curMessage.title}</div>
                <div className={styles.messageContent}>{curMessage.message}</div>
              </>
            }

          </Stack>
        </Stack>
      }

    </>

  );
}
