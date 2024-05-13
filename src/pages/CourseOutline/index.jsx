import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, InputLabel, MenuItem, Stack, Chip, Typography, IconButton, Button } from '@mui/material';
import styles from "./CourseOutline.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DialogBox from '../../components/DialogBox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import backendCall from '../../utils/network';
import { Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Padding } from '@mui/icons-material';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ModuleContent = ({ module, currentModuleId, currentPageId, isUserInstructor, onAddPage, onEditPage, onDeletePage, onDeleteModule, isOwnCourse }) => {
  const [isOpen, setIsOpen] = useState(false);



  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const getPageTypeClass = (type) => {
    switch (type) {
      case 'CODING':
        return styles.pageTypeLecture;
      case 'QUIZ':
        return styles.pageTypeQuiz;
      case 'TEXT':
        return styles.pageTypeInteractive;
      default:
        return styles.pageTypeOther;
    }
  };

  const isCurrentModule = module.moduleId == currentModuleId;
  const moduleStyles = isCurrentModule ? `${styles.moduleItem} ${styles.active}` : styles.moduleItem;
  console.log(isCurrentModule);
  return (
    <div className={moduleStyles}>
      <Stack flexDirection="row" justifyContent="space-between" onClick={toggleList}>
        <Stack>

          <span className={styles.moduleName}>{module.name} {isUserInstructor && isOwnCourse && <PrimaryBtn variant="outlined" className={styles.addPageBtn} sx={{ Padding: "5px" }} onClick={() => { onAddPage(module.id) }}><AddIcon /> Page </PrimaryBtn>}{module.isCompleted && <CheckIcon />}
            {isCurrentModule && <span className={styles.currentIndicator}>Current</span>}
          </span>

          <span className={styles.pagesCount}>{module.pages.length} Pages</span>
        </Stack>
        <span className={`toggle-button ${isOpen ? 'open' : ''}`}>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
        </span>
      </Stack>

      <ol className={"list"}>
        {
          isOpen && module.pages.map((page) => {
            const isCurrentPage = page.pageId === currentPageId;
            const pageStyles = isCurrentPage ? `${styles.pageContent} ${styles.activePage}` : styles.pageContent;
            return (
              <li className={pageStyles} key={page.pageId}>
                <span className={styles.pageName}>
                  {page.name} <span className={getPageTypeClass(page.pageType)}>{page.pageType}</span> {page.isCompleted && <CheckIcon />}
                  {isCurrentPage && <span className={styles.currentIndicator}>Current</span>}
                </span>
                {
                  isUserInstructor && isOwnCourse && (
                    <>
                      {/* <TransparentBtn onClick={() => onDeletePage(page.id)}>Delete</TransparentBtn> */}
                      <PrimaryBtn variant='contained' className={styles.editIcon} onClick={() => onEditPage(page.pageId, page.pageType)}><EditIcon /></PrimaryBtn>
                    </>
                  )
                }
              </li>
            )
          })
        }

        {/* {isOpen && isUserInstructor && isOwnCourse && <PrimaryBtn onClick={() => { onAddPage(module.id) }}><AddIcon/> Page </PrimaryBtn>} */}

      </ol>
    </div>
  );
};

export default function CourseOutline() {

  const [courseDetails, setCourseDetails] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [errorMesage, setErrorMessage] = useState('');
  const [isErrSnackbarOpen, setIsErrSnackbarOpen] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newPageName, setNewPageName] = useState('');
  const [newPageType, setNewPageType] = useState('');
  const [newPageDifficulty, setNewPageDifficulty] = useState('');
  const [curModuleId, setCurModuleId] = useState('');
  const [searchParams,] = useSearchParams();
  const [courseId, setCourseId] = useState('');
  const [isHintAllowed, setIsHintAllowed] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState('');
  const [currentPageId, setCurrentPageId] = useState('');



  const isUserStudent = () => {
    return user.role == "STUDENT";
  }


  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  const getCourseDetails = async (courseId) => {
    try {
      let response = await backendCall.post('/api/v1/academics/getcoursedetail/' + courseId, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      let data = response.data;
      setCourseDetails(data.courseDetail);
      setCurrentModuleId(data.courseDetail.currentModuleId);
      setCurrentPageId(data.courseDetail.currentPageId);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }

  useEffect(() => {
    let courseId = searchParams.get('id');
    setCourseId(courseId);
    getCourseDetails(courseId);
  }, []);

  const openCreateModuleDialog = () => setIsCreateModuleOpen(true);
  const closeCreateModuleDialog = () => setIsCreateModuleOpen(false);
  const openCreatePageDialog = (moduleId) => {
    setCurModuleId(moduleId);
    setIsCreatePageOpen(true);
  }
  const closeCreatePageDialog = () => setIsCreatePageOpen(false);

  const resumeCourse = async () => {
    // let response = sampleData['getCurrentCoursePage'].response;

    try {
      const response = await backendCall.post('/api/v1/academics/resumecourse/' + courseId, {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      let data = response.data;
      navigate(`/page/${data.pageType}?id=${data.pageId}`);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }

  }

  // const handleDeleteModule = () => {

  //   if (!courseDetails.isOwnCourse) return;
  //   setCourseDetails({
  //     ...courseDetails,
  //     modules: courseDetails.modules.filter(module => module.id !== moduleId)
  //   });
  // };

  const handleDeletePage = (pageId) => {
    if (!courseDetails.isOwnCourse) return;
    const newModules = courseDetails.modules.map(module => ({
      ...module,
      pages: module.pages.filter(page => page.id !== pageId)
    }));
    setCourseDetails({ ...courseDetails, modules: newModules });
  };

  const addModule = async (moduleName) => {
    try {
      let data = {
        courseId: courseId,
        name: moduleName
      }
      await backendCall.post('/api/v1/course/createmodule', data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      getCourseDetails(courseId);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }
  }

  const handleCreateModule = () => {
    if (!newModuleName.trim()) {
      setErrorMessage("Module name cannot be empty");
      setIsErrSnackbarOpen(true);
      return;
    }

    addModule(newModuleName);
    closeCreateModuleDialog();
  };


  const addPage = async (pageData) => {
    try {
      await backendCall.post('/api/v1/course/createpage', pageData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      getCourseDetails(courseId);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }
  }
  const handleCreatePage = () => {

    console.log("curModuleID : ", curModuleId);
    if (!newPageName.trim() || !newPageType || !newPageDifficulty) {
      setErrorMessage("All fields must be filled out");
      setIsErrSnackbarOpen(true);
      return;
    }
    let data = {
      name: newPageName,
      moduleId: curModuleId,
      isHintAllowed: isHintAllowed,
      pageType: newPageType,
      difficultyLevel: newPageDifficulty
    }
    addPage(data);
    //TODO: Add page creation logic here
    closeCreatePageDialog();
  };

  const handleEditPage = (pageId, pageType) => {
    navigate(`/page/${pageType}?id=${pageId}`);
  }


  const handleErrSnackbarClose = () => {
    setIsErrSnackbarOpen(false);
  }

  return (
    <>
      <Header />
      <div>
        <DialogBox open={isCreateModuleOpen} title="Create Module" onClose={closeCreateModuleDialog}>
          <WhiteContainedTextField
            width="450px"
            label="Module Name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <PrimaryBtn onClick={handleCreateModule}>Create Module</PrimaryBtn>
        </DialogBox>

        <DialogBox open={isCreatePageOpen} title="Create Page" onClose={closeCreatePageDialog}>
          <WhiteContainedTextField
            width="450px"
            label="Page Name"
            value={newPageName}
            onChange={(e) => setNewPageName(e.target.value)}
          />
          <WhiteSelect
            width="400px"
            label="Page Type"
            value={newPageType}
            onChange={(e) => setNewPageType(e.target.value)}
          >
            <MenuItem value="CODING">Coding</MenuItem>
            <MenuItem value="QUIZ">Quiz</MenuItem>
            <MenuItem value="TEXT">Text</MenuItem>
          </WhiteSelect>
          <WhiteSelect
            width="400px"
            label="Page Difficulty"
            value={newPageDifficulty}
            onChange={(e) => setNewPageDifficulty(e.target.value)}
          >
            <MenuItem value="EASY">Easy</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HARD">Hard</MenuItem>
          </WhiteSelect>
          <FormControlLabel
            control={
              <Checkbox
                checked={isHintAllowed}
                onChange={(e) => setIsHintAllowed(e.target.checked)}
              />
            }
            label="Allow Hints"
          />
          <PrimaryBtn onClick={handleCreatePage}>Create Page</PrimaryBtn>
        </DialogBox>
        {
          courseDetails != null &&
          <Stack className={styles.bodyParent} alignItems="left" flexDirection="column">
            <Stack alignItems="center" className={styles.bodyHeaderParent} justifyContent="space-between" flexDirection="row">
              <Stack className={styles.bodyHeader} gap={2}>
                <Typography variant="h4">{courseDetails.name}</Typography>
                <Chip label={courseDetails.difficultyLevel} sx={{ width: "100px" }} color="primary" size="small" />
                <div>
                  {courseDetails.tags.map(tag => <Chip key={tag.name} label={tag.name} variant="outlined" />)}
                </div>
                <span className={styles.courseDescription}>{courseDetails.description}</span>
                {isUserStudent() && <PrimaryBtn onClick={resumeCourse}>Resume Course </PrimaryBtn>}
              </Stack>
              <Stack className={styles.bodyHeader} >
                <Stack alignItems="center" justifyContent="left" flexDirection="row" gap={2} className={styles.moduleCountInfo} >
                  <AutoStoriesIcon /> {courseDetails.modules.length} Modules
                </Stack>
              </Stack>
            </Stack>

            <br></br>
            <h3>Syllabus</h3>

            <Stack className={styles.syllabusParent} justifyContent="center">
              {
                courseDetails.modules.map(module => (
                  <ModuleContent
                    key={module.name}
                    module={module}
                    isUserInstructor={user.role === "INSTRUCTOR"}
                    onAddPage={() => { openCreatePageDialog(module.moduleId) }}
                    onDeletePage={handleDeletePage}
                    currentModuleId={currentModuleId}
                    currentPageId={currentPageId}
                    // onDeleteModule={handleDeleteModule}
                    isOwnCourse={courseDetails.isOwnCourse}
                    onEditPage={handleEditPage}
                  />
                ))
              }

              {user.role === "INSTRUCTOR" && courseDetails.isOwnCourse && (
                <PrimaryBtn onClick={openCreateModuleDialog}>Add Module</PrimaryBtn>
              )}


            </Stack>

          </Stack>
        }

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
