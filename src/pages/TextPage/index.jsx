import React, { useEffect, useState, useRef } from 'react';
import styles from "./TextPage.module.css";
import { PrimaryBtn, WhiteContainedTextField, WhiteSelect } from '../../components/StyledMUIElem';
// import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';
import { Editor } from '@tinymce/tinymce-react';

// import ChatbotTask from "../../components/ChatbotTask";

import { AssistantWindow, Beak, useBeakFunction } from "@beakjs/react";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import ChatbotTask from '../../components/ChatbotTask';




export default function CodingPage() {

  const { user } = useAuth();
  const [startTime, setStartTime] = useState();
  const [isSaved, setIsSaved] = useState(false);

  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent);
  };

  // useBeakFunction({
  //   name: "getUserMessage",
  //   description: "This function updates the app's display message.",
  //   parameters: {
  //     message: {
  //       description: "Give me list messages that user interacted with you",
  //     },
  //   },
  //   handler: ({ message }) => {
  //     // setMessage(message);
  //     console.log("Message : ", message);

  //     // return `Updated the message to: "${message}"`;
  //   },
  // });

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving content:', content);
    setIsSaved(true);


  };

  const handleReset = () => {
    setContent('');
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
  };

  const isUserStudent = () => {
    return user.role == "student";
  }

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  useEffect(() => {
    let response = sampleData['getTextPage'].response;

  }, []);

  return (
    <>
      <PageHeader />
      <Beak
        __unsafeOpenAIApiKey__="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"
        instructions="Assistant is running in a Online Learning web app. You should help student learn the material and not give answers directly."
      >
        {<ChatbotTask /> }
        <Box id="page-body" className={styles.pageBody}>
          <Container>
            {isUserInstructor() ? (
              <div>
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
                  initialValue={content}
                  init={{
                    menubar: false,
                    // plugins: [
                    //   'advlist autolink lists link image charmap print preview anchor',
                    //   'searchreplace visualblocks code fullscreen',
                    //   'insertdatetime media table paste code help wordcount'
                    // ],
                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help'
                  }}
                  onEditorChange={handleEditorChange}
                />
                <div className={styles.buttonContainer}>
                  <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                  <Button variant="outlined" color="primary" onClick={handleReset} className={styles.resetButton}>Reset</Button>
                </div>
              </div>
            ) : (
              <div>
                <Editor
                  initialValue={content}
                  disabled={isUserInstructor()} // Disable editing for students
                  init={{
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: false // Hide toolbar for students
                  }}
                />
              </div>


            )}
          </Container>
        </Box >

        <AssistantWindow />
      </Beak>

      <Box className={styles.footer}>
        <PrimaryBtn variant="contained" color="primary" >Back</PrimaryBtn>
        <PrimaryBtn variant="contained" color="primary" >Next</PrimaryBtn>
      </Box>
    </>

  );
}
