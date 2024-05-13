import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, Checkbox, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./AllCourse.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import backendCall from '../../utils/network';

export default function AllCourse() {

  const { user } = useAuth();
  const [courseList, setCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [difficultyList, setDifficultyList] = useState([]);
  const [filters, setFilters] = useState({ name: '', tags: [], difficulty: [] });
  const navigate = useNavigate();

  const getAllCourses = async () => {
    const token = user.token;  // Using the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.get('/api/v1/course/getallcourses', config);
      let data = response.data;
      setCourseList(data.courses);
      processCourseAttributes(data.courses);
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw error;
    }
  }

  const getStudentCourses = async () => {
    const token = user.token;  // Using the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.get('/api/v1/course/getstudentcourses', config);
      let data = response.data;
      let enrolledResponse = data.courses;
      setEnrolledCourses(enrolledResponse.map(course => course.id));
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
      let enrolledResponse = data.courses;
      setEnrolledCourses(enrolledResponse.map(course => course.id));
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
    // TODO: replace with actual getCourse API
    getAllCourses();
    if (user.role === "STUDENT" || isUserInstructor()) {
      //TODO: replace with actual getEnrolledCourses API
      getUserCourses();
    }
  }, []);

  const handleDeleteCourse = (courseId) => {
    //TODO: replace with delete Course API


  }

  const getCourseInstructor = async (courseId) => {
    const token = user.token;  // Using the user's token

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await backendCall.get('/api/v1/course/getcourseinstructor/' + courseId, config);
      let data = response.data;
      return data.instructor;
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  }

  const sendMessage = async (courseId) => {
    let instructor = await getCourseInstructor(courseId);
    let data = {
      senderId: user.id,
      courseId: courseId,
      receiverId: instructor.id,
      title: "Course Request",
      message: "Kindly give me access to this course",
    }

    const response = await backendCall.post('/api/v1/contact/sendmessage', data,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

    console.log("send message : ", response);

  }

  const handleCourseRequest = (courseId) => {

    //TODO: get Course Instructor using getCourseInstructor API
    // let instructor = sampleData['getCourseInstructor'].response;

    sendMessage(courseId);

    //TODO: send course request to instructor
    // console.log("send message data : ", data);
  }

  const handleResumeLearning = (courseId) => {

    //TODO:  get current Page for student in the particular course
    let response = sampleData['getCurrentCoursePage'].response;
    let pageType = response.pageType.toLowerCase();
    navigate(`/page/${pageType}?id=${response.pageId}`);

  }

  const handleViewSyllabus = (courseId) => {
    navigate(`/courseOutline?id=${courseId}`);
  }

  const isUserStudent = () => {
    return user.role == "STUDENT";
  }

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  const isUserAdmin = () => {
    return user.role == "ADMIN";
  }

  const processCourseAttributes = (courses) => {
    const tags = new Set();
    const difficulties = new Set();
    courses.forEach(course => {
      course.tags.forEach(tag => tags.add(tag.name));
      difficulties.add(course.difficultyLevel);
    });
    setTagList(Array.from(tags));
    setDifficultyList(Array.from(difficulties));
  };

  const handleFilterChange = (type, value, isChecked) => {
    setFilters(prev => {
      const update = { ...prev };
      if (type === 'name') {
        update.name = value;
      } else if (type === 'tags') {
        if (isChecked) {
          update[type].push(value);
        } else {
          update[type] = update[type].filter(item => item !== value);
        }
      } else {
        if (isChecked) {
          update[type].push(value);
        } else {
          update[type] = update[type].filter(item => item !== value);
        }
      }
      return update;
    });
  };

  const applyFilters = () => {
    return courseList.filter(course => {
      console.log(filters.difficulty, course.difficultyLevel);
      return (
        course.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (
          filters.tags.length === 0 ||
          filters.tags.some(tag => {
            return course.tags.some(courseTag => courseTag.name == tag);
          })
        ) &&
        (
          (filters.difficulty.length === 0 || filters.difficulty.includes(course.difficultyLevel))
        )
      );
    });
  };

  return (
    <>
      <Header />
      <Stack className={styles.courseContainer} alignItems="flex-start" gap={10} flexDirection="row" flexWrap="nowrap">
        <div className={styles.sideBar}>
          <h2>Filters</h2>
          <div className={styles.searchBar}>
            <WhiteContainedTextField
              width="250px"
              type="text"
              placeholder="Search by name..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </div>
          <div className={styles.difficultyFilter}>
            <h3>Difficulty</h3>
            {difficultyList.map(difficulty => (
              <label key={difficulty}>
                <Checkbox
                  value={difficulty}
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={(e) => handleFilterChange('difficulty', difficulty, e.target.checked)}
                /> {difficulty}
              </label>
            ))}
          </div>
          <div className={styles.tagFilter}>
            <h3>Tags</h3>
            {tagList.map(tag => (
              <label key={tag}>
                <Checkbox
                  value={tag}
                  checked={filters.tags.includes(tag)}
                  onChange={(e) => handleFilterChange('tags', tag, e.target.checked)}
                /> {tag}
              </label>
            ))}
          </div>
        </div>
        <Stack alignItems="left" className={styles.courseTileParent} gap={10} flexDirection="row" flexWrap="wrap">
          {
            applyFilters().map((course) => (
              <Stack key={course.id} className={`${styles.courseTile} ${enrolledCourses.includes(course.id) ? styles.enrolledCourseTile : ''}`} flexDirection="column" alignItems="left" justifyContent="space-evenly" flexWrap="wrap">
                {enrolledCourses.includes(course.id) && <span className={styles.enrolledIndicator}>{isUserInstructor() ? "Your Course" : "Enrolled"}</span>}
                <Box>
                  <span className={styles.courseTitle}>{course.name}</span>
                  <span className={styles.courseDescription}>{course.description}</span>
                </Box>



                <Box>
                  <span className={styles.courseDetails}><b>Modules : </b>{course.modules}</span>
                  <span className={styles.courseDetails}><b>Difficulty : </b>{course.difficultyLevel}</span>
                  <span className={styles.courseDetails}><b>tags : </b>{course.tags.map(courseTag => courseTag.name).join(" , ")}</span>
                  {/* <span className={styles.courseDetails}><b>Instructor : </b>{course.instructor}</span> */}
                </Box>


                <Box textAlign="center">

                  {isUserStudent() && (
                    <>
                      {
                        enrolledCourses.includes(course.id) && <TransparentBtn onClick={() => (handleViewSyllabus(course.id))}>View Syllabus</TransparentBtn>
                      }
                      {
                        enrolledCourses.includes(course.id) ?
                          <PrimaryBtn onClick={() => (handleResumeLearning(course.id))}>Resume Learning</PrimaryBtn> :
                          <PrimaryBtn onClick={() => (handleCourseRequest(course.id))}>Request for Enroll</PrimaryBtn>
                      }
                    </>

                  )}
                  {
                    isUserAdmin() &&
                    <>
                      <TransparentBtn onClick={() => (handleViewSyllabus(course.id))}>View Syllabus</TransparentBtn>
                      <IconButton onClick={() => handleDeleteCourse(course.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>

                  }
                  {
                    isUserInstructor() &&
                    <>
                      {
                        enrolledCourses.includes(course.id) ?
                          <PrimaryBtn onClick={() => (handleViewSyllabus(course.id))}>Edit Course</PrimaryBtn> :
                          <TransparentBtn onClick={() => (handleViewSyllabus(course.id))}>View Syllabus</TransparentBtn>
                      }
                    </>
                  }

                </Box>
              </Stack>

            ))
          }
        </Stack>
      </Stack>
    </>
  );
}
