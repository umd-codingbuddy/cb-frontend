import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from "./TextPage.module.css";
import { PrimaryBtn } from '../../components/StyledMUIElem';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';
import { Editor } from '@tinymce/tinymce-react';

// import ChatbotTask from "../../components/ChatbotTask";

import { AssistantWindow, Beak, useBeakFunction } from "@beakjs/react";

import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography
} from '@mui/material';
import ChatbotTask from '../../components/ChatbotTask';
import { useSearchParams } from 'react-router-dom';
import backendCall from '../../utils/network';




export default function CodingPage() {

  const { user } = useAuth();
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [searchParams,] = useSearchParams();
  const [pageId, setPageId] = useState('');
  const [message, setMessage] = useState('');
  const [snackType, setSnackType] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [nextPageId, setNextPageId] = useState('');
  const [nextPageType, setNextPageType] = useState('');

  const [isHintAllowed, setIsHintAllowed] = useState(false);

  const [canGoNext, setCanGoNext] = useState(false);

  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const instructorBot = "Assistant is running on a lesson page and the user is instructor. You should help instructor in creating text page for their course. when helping, discard the tags. Only content is enough";
  const studentBot = "You are learning assistant for students. you should help students in understanding the lesson concept. answer questions only in the context of lesson concept and nothing else";

  const handleEditorChange = useCallback((newContent, editor) => {
    setContent(newContent);
  }, []);

  const handleSave = () => {
    console.log('Saving content:', content);
    saveText();
    setIsSaved(true);
  };

  const displaySnackBar = (snackType, message) => {
    setSnackType(snackType);
    setMessage(message);
    setIsSnackbarOpen(true);
  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  const getTextPage = async (pageId) => {
    try {
      let response = await backendCall.get('/api/v1/academics/getpagecontent/' + pageId, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      let content = response.data.page.pageContent;
      setContent(content.text);
      if (content != null) {
        // setQuizzes(response.questions);
        setIsHintAllowed(response.data.isHintAllowed);
      }

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }
  }

  const sendScore = async () => {
    let endTime = Date.now();

    let timeDif = Math.floor((endTime - startTime)/1000);
    let score = 100;
    if (timeDif < 60) {
      score = 100;
    } else if (timeDif > 120) {
      score = 90;
    } else if (timeDif > 180) {
      score = 80;
    } else if (timeDif > 240) {
      score = 70;
    } else {
      score = 60;
    }



    try {
      await backendCall.post('/api/v1/academics/calculateScore', {
        pageId: pageId,
        score: score,
        time: timeDif
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }
  }

  const handleSubmit = async () => {
    await sendScore();
    getNextPage();
  };

  const saveText = async () => {
    let pageData = {
      pageId: pageId,
      pageContent: {
        text: content
      }
    }
    try {
      const response = await backendCall.post('/api/v1/academics/addpagecontent', pageData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      displaySnackBar('success', "Content saved successfully");
      console.log('Profile updated successfully:', response);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }
  }

  const handleReset = () => {
    let response = sampleData['getTextPage'].response;
    if (editorRef.current) {
      setContent(response.content);
      // editorRef.current.setContent('');
    }
  };

  const isUserStudent = () => {
    return user.role == "STUDENT";
  }

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  useEffect(() => {
    let pageId = searchParams.get('id');
    setPageId(pageId);
    getTextPage(pageId);



  }, []);

  const getNextPage = async () => {
    try {
      let response = await backendCall.get('/api/v1/academics/getnextpage/' + pageId, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      let data = response.data;
      setNextPageId(data.pageId);
      setNextPageType(data.pageType);
      if (data.courseCompleted) {
        displaySnackBar('success', 'Course is completed successfully. Please go to course section')
      } else {
        setCanGoNext(true);
      }

    } catch (error) {
      setCanGoNext(true);
      console.error('Failed to fetch quiz page:', error);
    }

  }

  const handleEditorScroll = (e) => {

    // const editor = editorRef.current;
    // if (!editor) return;

    // // Access the scroll positions and dimensions directly from the editor API
    // const body = editor.getBody();
    // const doc = editor.getDoc();
    // const scrollTop = body.scrollTop || doc.documentElement.scrollTop;
    // const scrollHeight = body.scrollHeight;
    // const clientHeight = body.clientHeight;

    // const bottomTolerance = 5; // pixels of tolerance
    // console.log(scrollTop, clientHeight, bottomTolerance, scrollHeight)
    // if (scrollTop + clientHeight + bottomTolerance >= scrollHeight) {
    //   getNextPage();
    // } else {
    //   setCanGoNext(false); // Reset if they scroll back up
    // }
  };

  return (
    <>
      <PageHeader />

      <Box id="page-body" className={styles.pageBody}>

        {/* <Typography variant="h4" style={{ margin: '20px 0' }}>{title}</Typography> */}
        <Container className={styles.bodyContainer}>
          {isUserInstructor() ? (

            <Beak
              __unsafeOpenAIApiKey__="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"
              instructions={instructorBot}
            >
              {
                <ChatbotTask chatbotContent={content} chatbotContentKey="current lesson content" />
              }
              <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
                value={content}
                init={{
                  height: '100%',
                  width: '100%',
                  menubar: 'format',
                  resize: false,
                  plugins: [
                    'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                    'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                    'media', 'table', 'emoticons', 'help'
                  ],
                  toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                    'forecolor backcolor emoticons | help',
                }}
                onEditorChange={handleEditorChange}
                onActivate={handleEditorScroll}
                disabled={!user.role || user.role === "STUDENT"}
              />
              <AssistantWindow />
            </Beak>
          ) : (
            <Beak
              __unsafeOpenAIApiKey__="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"
              instructions={studentBot}
            >
              {
                <ChatbotTask chatbotContent={content} chatbotContentKey="current lesson content" />
              }
              <Editor
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                  handleEditorScroll();
                }}
                apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
                value={content}
                init={{
                  height: '100%',
                  width: '100%',
                  menubar: false,
                  toolbar: false,
                  resize: false,
                  setup: (editor) => {
                    editor.on('ScrollContent', handleEditorScroll);
                  }
                }}
                disabled={!user.role || user.role === "STUDENT"}
              />
              {
                isHintAllowed && <AssistantWindow />
              }
            </Beak>
          )}
        </Container>
      </Box >




      <Box className={styles.footer}>
        {isUserStudent() ? (
          <>
            {/* <PrimaryBtn variant="contained" color="primary" disabled={!canGoNext}>Back</PrimaryBtn> */}
            <PrimaryBtn variant="contained" color="primary" onClick={handleSubmit} disabled={canGoNext}>Finish</PrimaryBtn>
            <PrimaryBtn variant="contained" color="primary" disabled={!canGoNext}>Next</PrimaryBtn>
          </>

        ) : (
          <>
            <PrimaryBtn variant="contained" color="primary" onClick={handleReset}>Reset</PrimaryBtn>
            <PrimaryBtn variant="contained" color="primary" onClick={handleSave}>Save</PrimaryBtn>
          </>
        )}
      </Box>

      <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
        <Alert severity={snackType} onClose={hanldeSnackbarClose}>{message}</Alert>
      </Snackbar>

    </>

  );
}
