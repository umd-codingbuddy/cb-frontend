import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import { sampleData } from '../../utils/mockData';
import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import styles from "./CourseOutline.module.css";
import { PrimaryBtn, TransparentBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DialogBox from '../../components/DialogBox';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const ModuleContent = ({ module, isUserInstructor, onAddPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.moduleItem}>
      <Stack flexDirection="row" justifyContent="space-between" onClick={toggleList}>
        <Stack>
          <span className={styles.moduleName}>{module.name}</span>
          <span className={styles.pagesCount}>{module.pages.length} Pages</span>
        </Stack>



        <span className={`toggle-button ${isOpen ? 'open' : ''}`}>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>{isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
        </span>
      </Stack>

      <ol className={"list"}>
        {isOpen && module.pages.map((page) => {
          return (
            <li className={styles.pageContent}>
              <span className={styles.pageName}>{page.name} - {page.type}</span>
              { isUserInstructor && <TransparentBtn>Edit</TransparentBtn>}
            </li>
          )
        })
        }

        {isOpen && isUserInstructor && <PrimaryBtn onClick={onAddPage}>Add Page </PrimaryBtn>}

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


  const isUserStudent = () => {
    return user.role == "student";
  }

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  useEffect(() => {
    //TODO: replace with actual getCourse API
    let response = sampleData['getCourseDetails'].response;
    setCourseDetails(response);
  }, []);

  const openCreateModuleDialog = () => {
    setIsCreateModuleOpen(true);
  }

  const closeCreateModuleDialog = () => {
    setIsCreateModuleOpen(false);
  }

  const openCreatePageDialog = () => {
    setIsCreatePageOpen(true);
  }

  const closeCreatePageDialog = () => {
    setIsCreatePageOpen(false);
  }

  return (
    <>
      <Header />
      <div>
        <DialogBox open={isCreateModuleOpen} title="Create Module" onClose={closeCreateModuleDialog}>
          <WhiteContainedTextField width="450px" label="Module Name" />
          <PrimaryBtn>Create Module </PrimaryBtn>
        </DialogBox>

        <DialogBox open={isCreatePageOpen} title="Create Page" onClose={closeCreatePageDialog}>
          <WhiteContainedTextField width="450px" label="Page Name" />
          <WhiteContainedTextField width="450px" label="Page Deadline(in days)" type="number" />
          <>
            <InputLabel id="ins-label">Is Hint Allowed</InputLabel>
            <WhiteSelect width="400px" label="Page Hint">
              <MenuItem value={10}>Yes</MenuItem>
              <MenuItem value={10}>Not</MenuItem>
            </WhiteSelect>
          </>
          <>
            <InputLabel id="ins-label">Page type</InputLabel>
            <WhiteSelect width="400px" label="Page Difficulty">
              <MenuItem value={10}>Coding</MenuItem>
              <MenuItem value={10}>Quiz</MenuItem>
              <MenuItem value={10}>Text</MenuItem>
            </WhiteSelect>
          </>
          <>
            <InputLabel id="ins-label">Page Difficulty</InputLabel>
            <WhiteSelect width="400px" label="Page Difficulty">
              <MenuItem value={10}>Easy</MenuItem>
              <MenuItem value={10}>Medium</MenuItem>
              <MenuItem value={10}>Hard</MenuItem>
            </WhiteSelect>
          </>
          <PrimaryBtn>Create Page</PrimaryBtn>
        </DialogBox>
        {
          courseDetails != null &&
          <Stack className={styles.bodyParent} alignItems="left" flexDirection="column">
            <Stack alignItems="center" className={styles.bodyHeaderParent} justifyContent="space-between" flexDirection="row">
              <Stack className={styles.bodyHeader} gap={2}>
                <h2>{courseDetails.name}</h2>
                {isUserInstructor() && <PrimaryBtn>Resume Course </PrimaryBtn>}
                <span className={styles.courseDescription}>{courseDetails.description}</span>
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
                courseDetails.modules.map((module) => {
                  return (
                    <ModuleContent isUserInstructor={isUserInstructor()} onAddPage={openCreatePageDialog} module={module}></ModuleContent>
                  )
                })
              }

              <Stack alignItems="center">
                {isUserInstructor() && <PrimaryBtn onClick={openCreateModuleDialog}>Add Module </PrimaryBtn>}
              </Stack>


            </Stack>

          </Stack>
        }

      </div>
    </>

  );
}
