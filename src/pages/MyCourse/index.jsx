import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import styles from "./MyCourse.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import CloseIcon from '@mui/icons-material/Close';

export default function MyCourse() {

  const [courseList, setCourseList] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = (event) => {
    if (event.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };


  const isUserStudent = () => {
    return user.role == "student";
  }

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  useEffect(() => {
    //TODO: replace with actual getCourse API
    let response = sampleData['getMyCourse'].response;
    setCourseList(response);
  }, []);

  const handleEditCourse = (id) => {
    navigate(`/courseOutline?id=${id}`);
  }

  const handleViewProgress = (id) => {
    navigate(`/courseProgress?id=${id}`);
  }

  const openCreateCourseDialog = () => {
    setIsCreateDialogOpen(true);
  }

  const closeCreateCourseDialog = () => {
    setIsCreateDialogOpen(false);
  }

  return (
    <>
      <Header />
      <div>
        <DialogBox open={isCreateDialogOpen} title="Create Course" onClose={closeCreateCourseDialog}>
          <WhiteContainedTextField width="450px" label="Course Name" />
          <WhiteContainedTextField multiline={true} width="450px" label="Course Description" />
          <>
            <InputLabel id="ins-label">Course Difficulty</InputLabel>
            <WhiteSelect width="400px" label="Course Difficulty">
              <MenuItem value={10}>Easy</MenuItem>
              <MenuItem value={10}>Medium</MenuItem>
              <MenuItem value={10}>Hard</MenuItem>
            </WhiteSelect>
          </>
          <WhiteContainedTextField
            width="450px"
            label="Course Tags"
            type="text"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleAddTag}
            placeholder="Type a Tag and press Enter"
          />
          <Stack flexWrap="wrap" flexDirection="row" alignItems="center" justifyContent="space-evenly">
            {tags.map((str, index) => (
              <span key={index} className={styles.tagName}>
                {str} <CloseIcon color="red" onClick={() => handleRemoveTag(index)}></CloseIcon>
              </span>
            ))}
          </Stack>
          <PrimaryBtn>Create Course </PrimaryBtn>
        </DialogBox>
        <Stack className={styles.courseContainer} alignItems="center" flexDirection="column">
          <Stack className={styles.courseContainer} alignItems="center" justifyContent="space-between" flexDirection="row">
            <h2>My Courses</h2>
            {isUserStudent() && <PrimaryBtn>Request a Course</PrimaryBtn>}
            {isUserInstructor() && <PrimaryBtn onClick={openCreateCourseDialog}>Create Course</PrimaryBtn>}
          </Stack>
          {
            courseList.map((course) => {
              return (
                <Stack key={course.id} className={styles.courseTile} flexDirection="column" justifyContent="space-around">
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <span className={styles.courseTitle}>{course.name}</span>
                      <span className={styles.courseDescription}>{course.description}</span>
                    </Box>
                    {isUserStudent() &&
                      <Box className={styles.courseProgressContainer}>

                        <Typography variant="body1" align="center">
                          {`${course.percentageCompleted}%`}
                        </Typography>
                        <LinearProgress variant="determinate" value={course.percentageCompleted} />
                      </Box>
                    }
                  </Stack>
                  <Stack flexDirection="row" className={styles.courseTileFooter} gap={10} justifyContent="end">
                    {isUserStudent() && <TransparentBtn>View Syllabus</TransparentBtn>}
                    {isUserStudent() && <PrimaryBtn>Resume Learning </PrimaryBtn>}

                    {isUserInstructor() && <PrimaryBtn onClick={() => { handleEditCourse(course.id) }}>Edit Course </PrimaryBtn>}
                    {isUserInstructor() && <PrimaryBtn onClick={() => { handleViewProgress(course.id) }}>View Student Progress </PrimaryBtn>}

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
