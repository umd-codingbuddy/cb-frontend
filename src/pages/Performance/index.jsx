import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import styles from "./Performance.module.css";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function MyCourse() {

  const [courseList, setCourseList] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState([]);

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  useEffect(() => {
    //TODO: replace with actual getCourse API
    let response = sampleData['getCoursePerformance'].response;
    setPerformanceData(response.students);
  }, []);

  return (
    <>
      <Header />
      <div>
        <Container className={styles.container}>
          <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="performance table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.headerCell}>Student Name</TableCell>
                  <TableCell className={styles.headerCell}>Modules Completed</TableCell>
                  <TableCell className={styles.headerCell}>Performance Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceData.map((row) => (
                  <TableRow key={row.studentId}>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.modulesCompleted}</TableCell>
                    <TableCell>{row.performanceScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>

  );
}
