import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import styles from "./MyCourse.module.css";
import { PrimaryBtn, TransparentBtn } from '../../components/StyledMUIElem';

export default function MyCourse() {

  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    //TODO: replace with actual getCourse API
    let response = sampleData['getCourse'].response;
    setCourseList(response);

  }, []);

  return (
    <>
      <Header />
      <div>
        <Stack className={styles.courseContainer} alignItems="center" flexDirection="column">
          <Stack className={styles.courseContainer} alignItems="center" justifyContent="space-between" flexDirection="row">
            <h2>My Courses</h2>
            <PrimaryBtn>Request a Course</PrimaryBtn>
          </Stack>
          {
            courseList.map((course) => {
              return (
                <Stack key={course.id} className={styles.courseTile} flexDirection="column" justifyContent="space-around">
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      {/* <div>Course</div> */}
                      <span className={styles.courseTitle}>{course.name}</span>
                      <span className={styles.courseDescription}>{course.description}</span>
                    </Box>
                    <Box className={styles.courseProgressContainer}>
                      <Typography variant="body1" align="center">
                        {`${course.percentageCompleted}%`}
                      </Typography>
                      <LinearProgress variant="determinate" value={course.percentageCompleted} />
                    </Box>
                  </Stack>
                  <Stack flexDirection="row" className={styles.courseTileFooter} justifyContent="end">
                      <TransparentBtn>View Syllabus</TransparentBtn>
                      <PrimaryBtn>Resume Learning </PrimaryBtn>
                  </Stack>

                </Stack>
              )
            })
          }

        </Stack>
      </div>
    </>

  );
}
