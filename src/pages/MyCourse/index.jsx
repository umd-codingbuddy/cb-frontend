import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, InputLabel, MenuItem, Stack, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import styles from "./MyCourse.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import backendCall from '../../utils/network';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function MyCourse() {

  const [courseList, setCourseList] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDifficulty, setCourseDifficulty] = useState('');
  const [errorMesage, setErrorMessage] = useState('');
  const [isErrSnackbarOpen, setIsErrSnackbarOpen] = useState(false);

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
    return user.role == "STUDENT";
  }

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  const getStudentCourses = async () => {
    const token = user.token;  // Using the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.get('/api/v1/course/getstudentcourses', config);
      let data = response.data;
      setCourseList(data.courses);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  }

  const getInstructorCourses = async () => {
    const token = user.token;  // Using the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.get('/api/v1/course/getinstructorcourses', config);
      let data = response.data;
      setCourseList(data.courses);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  }

  const getUserCourses = () => {
    if (isUserStudent()) {
      getStudentCourses();
    } else if (isUserInstructor()) {
      getInstructorCourses();
    }
  }

  useEffect(() => {
    getUserCourses();


  }, []);

  const handleEditCourse = (id) => {
    navigate(`/courseOutline?id=${id}`);
  }

  const handleViewProgress = (id) => {
    navigate(`/courseProgress?courseId=${id}`);
  }

  const openCreateCourseDialog = () => {
    setIsCreateDialogOpen(true);
  }

  const closeCreateCourseDialog = () => {
    setIsCreateDialogOpen(false);
  }

  const handleErrSnackbarClose = () => {
    setIsErrSnackbarOpen(false);
  }

  const validateCourseData = () => {
    if (!courseName || !courseDescription || !courseDifficulty || tags.length === 0) {
      setErrorMessage("All fields must be filled and at least one tag is required.");
      setIsErrSnackbarOpen(true);
      return false;
    }
    return true;
  };

  const createCourse = async (courseData) => {
    const token = user.token;  // Use the user's token

    // Setting up the Authorization header with the token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.post('/api/v1/course/createcourse', courseData, config);
      console.log('Create Course Response:', response.data);
      getUserCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  }


  const handleCreateCourse = () => {
    if (validateCourseData()) {
      // TODO: Implement course creation logic here
      let courseData = {
        name: courseName,
        description: courseDescription,
        difficultyLevel: courseDifficulty, //EASY, MEDIUM, HARD
        tags: tags

      }
      console.log("Creating course with:", courseData);
      createCourse(courseData);
      setIsCreateDialogOpen(false); // Close dialog on success
    }
  };
  const handleDeleteCourse = (courseId) => {
    // TODO: Implement course deletion logic here
    console.log("Deleting course with ID:", courseId);
    setCourseList(courseList.filter(course => course.id !== courseId));
  };

  const resumeCourse = async (courseId) => {
    let response = await backendCall.post('/api/v1/academics/resumecourse/' + courseId,{}, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    let data = response.data;
    let pageType = data.pageType.toLowerCase();
    navigate(`/page/${pageType}?id=${data.pageId}`);

  }

  const handleResumeLearning = (courseId) => {

    //TODO:  get current Page for student in the particular course
    // let response = sampleData['getCurrentCoursePage'].response;
    resumeCourse(courseId)

  }

  const handleViewSyllabus = (courseId) => {
    navigate(`/courseOutline?courseId=${courseId}`);
  }

  return (
    <>
      <Header />
      <div>
        <DialogBox open={isCreateDialogOpen} title="Create Course" onClose={closeCreateCourseDialog}>
          <WhiteContainedTextField
            width="450px"
            label="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <WhiteContainedTextField
            multiline={true}
            width="450px"
            label="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
          <InputLabel id="course-difficulty-label">Course Difficulty</InputLabel>
          <WhiteSelect
            width="400px"
            labelId="course-difficulty-label"
            value={courseDifficulty}
            onChange={(e) => setCourseDifficulty(e.target.value)}
          >
            <MenuItem value="EASY">Easy</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HARD">Hard</MenuItem>
          </WhiteSelect>
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
          <PrimaryBtn onClick={handleCreateCourse}>Create Course</PrimaryBtn>
        </DialogBox>
        <Stack className={styles.courseContainer} alignItems="center" flexDirection="column">
          <Stack className={styles.courseContainer} alignItems="center" justifyContent="space-between" flexDirection="row">
            <h2>My Courses</h2>
            {isUserInstructor() && <PrimaryBtn onClick={openCreateCourseDialog}>Create Course</PrimaryBtn>}
          </Stack>
          {
            courseList.length > 0 ? (
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
                            {`${course.completionPercentage}%`}
                          </Typography>
                          <LinearProgress variant="determinate" value={course.completionPercentage} />
                        </Box>
                      }
                    </Stack>
                    <Stack flexDirection="row" className={styles.courseTileFooter} gap={10} justifyContent="end">
                      {isUserStudent() && <TransparentBtn onClick={() => (handleViewSyllabus(course.id))}>View Syllabus</TransparentBtn>}
                      {isUserStudent() && <PrimaryBtn onClick={() => (handleResumeLearning(course.id))}>Resume Learning </PrimaryBtn>}

                      {isUserInstructor() && <>
                        <PrimaryBtn onClick={() => handleEditCourse(course.id)}>Edit Course</PrimaryBtn>
                        <PrimaryBtn onClick={() => handleViewProgress(course.id)}>View Student Progress</PrimaryBtn>
                        {/* <IconButton onClick={() => handleDeleteCourse(course.id)}><DeleteIcon /></IconButton> */}
                      </>}

                    </Stack>

                  </Stack>
                )
              })
            ) : (
              <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                No courses have been selected.
              </Typography>
            )
          }

        </Stack>
        <Snackbar
          open={isErrSnackbarOpen}
          autoHideDuration={4000}
          onClose={handleErrSnackbarClose}
          disableWindowBlurListener={true}
        >
          <Box>
            <Alert onClose={handleErrSnackbarClose} severity="error">
              {errorMesage}
            </Alert>
          </Box>

        </Snackbar>
      </div>
    </>

  );
}
