import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import styles from "./AllCourse.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';

export default function AllCourse() {

  const { user } = useAuth();
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    //TODO: replace with actual getCourse API
    let response = sampleData['getAllCourse'].response;
    setCourseList(response);

  }, []);

  const isUserStudent = () => {
    return user.role == "student";
  }

  return (
    <>
      <Header />
      <div>
        <Stack className={styles.courseContainer} alignItems="center" gap={10} flexDirection="row" flexWrap="nowrap">
          <div className={styles.sideBar}>
            <h2>Filters</h2>
            <div className={styles.searchBar}>
              <WhiteContainedTextField  width="250px" type="text" placeholder="Search by name..." />
            </div>
            <div className={styles.difficultyFilter}>
              <h3>Difficulty</h3>
              <label><Checkbox value="easy"/> Easy</label>
              <label><Checkbox value="medium"/> Medium</label>
              <label><Checkbox value="hard"/> Hard</label>
            </div>
            <div className={styles.tagFilter}>
              <h3>Tags</h3>
              <label><Checkbox value="tag1"/> Tag 1</label>
              <label><Checkbox value="tag2"/> Tag 2</label>
              <label><Checkbox value="tag3"/> Tag 3</label>
            </div>
          </div>
          <Stack alignItems="left" className={styles.courseTileParent} gap={10} flexDirection="row" flexWrap="wrap">
            {
              courseList.map((course) => {
                return (
                  <Stack key={course.id} className={styles.courseTile} flexDirection="column" alignItems="left" justifyContent="space-evenly" flexWrap="wrap">
                    <Box>
                      <span className={styles.courseTitle}>{course.name}</span>
                      <span className={styles.courseDescription}>{course.description}</span>
                    </Box>

                    <Box>
                      <span className={styles.courseDetails}><b>Modules : </b>{course.totalModules}</span>
                      <span className={styles.courseDetails}><b>Difficulty : </b>{course.difficultyLevel}</span>
                      <span className={styles.courseDetails}><b>Instructor : </b>{course.instructor}</span>
                    </Box>


                    <Box textAlign="center">
                      <TransparentBtn>View Syllabus</TransparentBtn>
                       { isUserStudent() &&  <PrimaryBtn>Resume Learning </PrimaryBtn>}
                    </Box>
                  </Stack>
                )
              })
            }
          </Stack>
        </Stack>
      </div>
    </>
  );
}
