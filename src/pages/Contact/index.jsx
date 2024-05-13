import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import styles from "./Contact.module.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { PrimaryBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import backendCall from '../../utils/network';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Contact() {

  const { user } = useAuth();
  const [insMessages, setInsMessages] = useState([]);
  const [curMessage, setCurMessage] = useState(null);
  const [insList, setInsList] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [errorMesage, setErrorMessage] = useState('');
  const [isErrSnackbarOpen, setIsErrSnackbarOpen] = useState(false);

  const [snackMessage, setSnackMessage] = useState('');
  const [snackType, setSnackType] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const isUserStudent = () => {
    return user.role == "STUDENT";
  }

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  const hanldeErrSnackbarClose = () => {
    setIsErrSnackbarOpen(false);
  }

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  }

  const getInstructors = async () => {
    try {
      const response = await backendCall.get('/api/v1/user/getInstructors', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      let data = response.data;
      console.log('Instructors fetched successfully:', data);
      setInsList(data)
      // Handle the response data, e.g., update state with instructors list
    } catch (error) {
      console.error('Failed to fetch instructors:', error);
      // Handle error case
    }
  }

  const getUserMessages = async () => {
    let response = await backendCall.get('/api/v1/contact/getallmessages', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    let data = response.data;
    setInsMessages(data.messages);
  }

  const displaySnackBar = (snackType, message) => {
    setSnackType(snackType);
    setSnackMessage(message);
    setIsSnackbarOpen(true);
  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  useEffect(() => {

    if (isUserInstructor()) {
      getUserMessages();
      // let response = sampleData['getContactMessages'].response;
      // setInsMessages(response);
    } else if (isUserStudent()) {
      getInstructors();

    }
  }, []);


  const getInstructorCourses = async (insId) => {
    let response = await backendCall.get('/api/v1/course/getusercourses/' + insId, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    let data = response.data;
    setCourses(data.courses);
  }

  const handleChangeInstructor = (event) => {
    const selectedId = event.target.value;
    setSelectedInstructor(selectedId);
    getInstructorCourses(selectedId);
  };

  const handleChangeCourse = (event) => {
    const selectedId = event.target.value;
    setSelectedCourse(selectedId);
  };

  const validateForm = () => {

    if (selectedInstructor == "") {
      setErrorMessage("Select Instructor")
      setIsErrSnackbarOpen(true);
      return false
    }

    if (selectedCourse == "") {
      setErrorMessage("Select Course")
      setIsErrSnackbarOpen(true);
      return false
    }

    if (title == "") {
      setErrorMessage("Title cannot be empty")
      setIsErrSnackbarOpen(true);
      return false
    }

    if (message == "") {
      setErrorMessage("Message cannot be empty")
      setIsErrSnackbarOpen(true);
      return false
    }
    return true;
  };


  const showMessageContent = (id) => {
    let curMessage = insMessages.filter((msg, ind) => ind === id);
    setCurMessage(curMessage[0]);
  }

  const sendMessage = async () => {
    if (validateForm()) {
      let data = {
        senderId: user.id,
        courseId: selectedCourse,
        receiverId: selectedInstructor,
        title: title,
        message: message,
      }

      const response = await backendCall.post('/api/v1/contact/sendmessage', data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      displaySnackBar("success", "message sent successfully");
      console.log("send message : ", response);
    }
  }

  return (
    <>
      <Header />
      {
        isUserStudent() &&
        <Stack className={styles.contactContainer} alignItems="center" flexDirection="column">
          <h2>Contact</h2>
          <InputLabel id="ins-label">Select Instructor</InputLabel>
          <WhiteSelect width="400px" id="ins-label" value={selectedInstructor} onChange={handleChangeInstructor}>
            {
              insList.filter((ins) => (ins.verified)).map((ins) => {
                return (
                  <MenuItem key={ins.id} value={ins.id}>{ins.name}</MenuItem>
                )
              })
            }

          </WhiteSelect>
          <br></br>
          {
            selectedInstructor != "" &&
            <>
              <InputLabel id="ins-label">Select Course</InputLabel>
              <WhiteSelect width="400px" label="Select Course" value={selectedCourse} onChange={handleChangeCourse}>
                {
                  courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                  ))
                }
              </WhiteSelect>
              <br></br>
            </>

          }


          <WhiteContainedTextField multiline={true} width="450px" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <WhiteContainedTextField multiline={true} width="450px" label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <br>
          </br>
          <Stack flexDirection="row" className={styles.imageStack} alignItems="center" justifyContent="space-evenly" >
            <PrimaryBtn onClick={sendMessage} >Send Message</PrimaryBtn>
          </Stack>
        </Stack>
      }

      {
        isUserInstructor() &&
        <Stack className={styles.messageContainer} alignItems="center" flexDirection="row">
          <Stack className={styles.messagePreviewContainer} flexDirection="column" flex="wrap">
            {
              insMessages.map((message, ind) => {
                return (
                  <Box
                    className={`${styles.messageTile} ${curMessage && curMessage.createdAt === message.createdAt ? styles.selected : ''}`}
                    key={ind}
                    onClick={() => { showMessageContent(ind); }}
                  >
                    <div><span className={styles.messagePreviewDateText}>Date :</span> {convertTimestampToDate(message.createdAt)}</div>
                    <div><span className={styles.messagePreviewDateText}>From:</span> {message.student.firstname + message.student.lastname}</div>
                    <div><span className={styles.messagePreviewDateText}>Title :</span> {message.title}</div>
                    {/* <div className={styles.messagePreviewContentText}>{message.message}</div> */}
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
              <Box className={styles.messageContentContainer}>
                <Typography variant="h6" className={styles.messageHeader}><span className={styles.messagePreviewDateText}>From :</span> {curMessage.student.firstname} {curMessage.student.lastname}</Typography>
                <Typography variant="h6" className={styles.messageHeader}><span className={styles.messagePreviewDateText}>Title :</span> {curMessage.title}</Typography>
                <Typography variant="subtitle1" className={styles.messageHeader}><span className={styles.messagePreviewDateText}>Date :</span> {convertTimestampToDate(curMessage.createdAt)}</Typography>
                <Typography className={styles.messageBody}>{curMessage.message}</Typography>
              </Box>
            }


          </Stack>
        </Stack>
      }

      <Snackbar
        open={isErrSnackbarOpen}
        autoHideDuration={4000}
        onClose={hanldeErrSnackbarClose}
        disableWindowBlurListener={true}
      >
        <Box>
          <Alert onClose={hanldeErrSnackbarClose} severity="error">
            {errorMesage}
          </Alert>
        </Box>

      </Snackbar>

      <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
        <Alert severity={snackType} onClose={hanldeSnackbarClose}>{snackMessage}</Alert>
      </Snackbar>

    </>

  );
}
