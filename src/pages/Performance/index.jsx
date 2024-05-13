import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import styles from "./Performance.module.css";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { PrimaryBtn } from '../../components/StyledMUIElem';
import DialogBox from '../../components/DialogBox';
import { useParams } from 'react-router-dom';
import backendCall from '../../utils/network';



export default function MyCourse() {

  const [courseList, setCourseList] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [searchParams,] = useSearchParams();
  const [courseId, setCourseId] = useState('');


  const { user } = useAuth();
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState([]);

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }



  const getStudentDetails = async (courseId) => {
    try {
      let response = await backendCall.get('/api/v1/academics/getstatements/' + courseId, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      let data = response.data;
      setPerformanceData(data.statements);
      // console.log('Add Student to Course Response:', response.data);
    } catch (error) {
      console.error('Error adding student to course:', error);
    }

  }
  useEffect(() => {
    //TODO: replace with actual getCourse API
    let courseId = searchParams.get('courseId')
    setCourseId(courseId)
    getStudentDetails(courseId);
    // let response = sampleData['getCoursePerformance'].response;

  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const addStudentToCourse = async (studentEmail) => {
    const token = user.token;  // Use the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const requestBody = {
      courseId: +courseId,
      email: studentEmail
    };

    try {
      const response = await backendCall.post('/api/v1/academics/addstudenttocourse', requestBody, config);
      console.log('Add Student to Course Response:', response.data);
    } catch (error) {
      console.error('Error adding student to course:', error);
    }
  }

  const handleAddStudent = () => {
    console.log("Adding student with email:", studentEmail);
    addStudentToCourse(studentEmail);
    handleCloseDialog();
  };


  return (
    <>
      <Header />
      <DialogBox open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="student-email"
            label="Student Email"
            type="email"
            fullWidth
            variant="standard"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddStudent}>Add</Button>
        </DialogActions>
      </DialogBox>

      <div>
        <Container className={styles.container}>
          <PrimaryBtn variant="contained" color="primary" onClick={handleOpenDialog} className={styles.addButton}>
            Add Student
          </PrimaryBtn>

          <TableContainer component={Paper}>
            {
              performanceData.length > 0 ? (
                <Table className={styles.table} aria-label="performance table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.headerCell}>Student Name</TableCell>
                      <TableCell className={styles.headerCell}>Percentage Completed</TableCell>
                      <TableCell className={styles.headerCell}>Performance Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {
                      performanceData.map((row) => (
                        <TableRow key={row.studentId}>
                          <TableCell>{row.studentName}</TableCell>
                          <TableCell>{row.completedPercentage} %</TableCell>
                          <TableCell>{row.performanceScore}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              ) : (
                <Typography style={{ margin: 16 }} variant="subtitle1">
                  No student data available.
                </Typography>
              )}
          </TableContainer>
        </Container>
      </div>
    </>

  );
}
