import React, { useEffect, useState } from 'react';
import styles from "./QuizPage.module.css";
import { PrimaryBtn } from '../../components/StyledMUIElem';
// import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import CryptoJS from 'crypto-js';

// import ChatBotTask from '../../ChatBotTask';

import { AssistantWindow, Beak, useBeakFunction, useBeakInfo } from "@beakjs/react";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Stack,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import ChatbotTask from '../../components/ChatbotTask';
import GetChatBotInfo from '../../components/GetChatBotInfo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import backendCall from '../../utils/network';


export default function QuizPage() {

  const { user } = useAuth();
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState();
  const [quizzes, setQuizzes] = useState([]);
  const [isHintAllowed, setIsHintAllowed] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const instructorBot = "Assistant is running on a quiz page and the user is instructor. You should help instructor in creating quiz page and options.";
  const studentBot = "You are learning assistant for students. You should not give direct answers But you can help them solve their doubts. Don't give direct answers but help them solving it.";
  const [searchParams,] = useSearchParams();
  const [pageId, setPageId] = useState('');
  const [message, setMessage] = useState('');
  const [snackType, setSnackType] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [nextPageId, setNextPageId] = useState('');
  const [nextPageType, setNextPageType] = useState('');
  const navigate = useNavigate();

  const handleAddQuiz = () => {
    if (quizzes.length < 10) {
      setQuizzes([...quizzes, { question: '', options: [{ text: '', isCorrect: false }] }]);
    }
  };

  const getQuizPage = async (pageId) => {
    try {
      let response = await backendCall.get('/api/v1/academics/getpagecontent/' + pageId, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      let content = response.data.page.pageContent;


      console.log(content);
      if (content.quiz != null) {
        setQuizzes(content.quiz);
        // setIsHintAllowed(response.isHintAllowed);
      }

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }
  }

  const handleReset = () => {
    // setQuizzes();
    getQuizPage(pageId);
  };

  const saveQuiz = async (quizData) => {
    let pageData = {
      pageId: pageId,
      pageContent: {
        quiz: quizData
      }
    }
    try {
      const response = await backendCall.post('/api/v1/academics/addpagecontent', pageData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

      console.log('Profile updated successfully:', response);
      // Handle any additional logic after successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error case
    }
  }

  const displaySnackBar = (snackType, message) => {
    setSnackType(snackType);
    setMessage(message);
    setIsSnackbarOpen(true);
  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }

  const handleSave = () => {
    const quizData = quizzes.map((quiz) => ({
      question: quiz.question,
      options: quiz.options.map((option) => ({ text: option.text, isCorrect: option.isCorrect }))
    }));
    saveQuiz(quizData);
    // console.log(quizData);
    displaySnackBar('success', "Content saved successfully");

  };

  const handleQuestionChange = (index, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[index].question = event.target.value;
    setQuizzes(newQuizzes);
  };

  const handleOptionChange = (quizIndex, optionIndex, event) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options[optionIndex].text = event.target.value;
    setQuizzes(newQuizzes);
  };

  const handleCorrectChange = (quizIndex, optionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options.forEach((option, index) => {
      option.isCorrect = index === optionIndex;
    });
    setQuizzes(newQuizzes);
  };

  const handleAddOption = (quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options.push({ text: '', isCorrect: false });
    setQuizzes(newQuizzes);
  };

  const handleRemoveOption = (quizIndex, optionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options.splice(optionIndex, 1);
    setQuizzes(newQuizzes);
  };

  const handleRemoveQuizOption = (quizIndex, optionIndex) => {
    const newQuizzes = [...quizzes];
    delete newQuizzes.splice(quizIndex, 1);
    setQuizzes(newQuizzes);
  };

  const handleOptionSelect = (quizIndex, optionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].selectedOption = optionIndex;
    setQuizzes(newQuizzes);
  };

  const handleNextPage = () => {
    navigate(`/page/${nextPageType}?id=${nextPageId}`);
  }

  const formatTime = () => {
    const timeElapsed = Date.now() - startTime;
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / 1000 / 60) % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const onSubmitCallback = (count) => {
    console.log("onSubmitCallback : ", count);
  }
  const sendScore = async () => {
    let endTime = Date.now();

    let timeDif = Math.floor((endTime - startTime) / 1000);

    const correctCount = quizzes.reduce((acc, quiz) => {
      const selectedOption = quiz.options[quiz.selectedOption];
      return acc + (selectedOption && selectedOption.isCorrect ? 1 : 0);
    }, 0);

    let score = (correctCount / quizzes.length) * 100;

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
        setSubmitted(true);
      }

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }

  }

  const handleSubmit = async () => {
    let endTime = Date.now();
    setEndTime(Date.now());


    await sendScore();
    getNextPage();
    // console.log(`Time taken: ${Math.floor((endTime - startTime) / 1000)} seconds`);
    // console.log(`Correct answers: ${correctCount} out of ${quizzes.length}`);
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
    getQuizPage(pageId);

    // let response = sampleData['getQuizPage'].response;

  }, []);

  const decryptApiKey = (encryptedKey) => {
    const passphrase = 'your-secure-passphrase';  // Must be the same passphrase used for encryption
    const bytes = CryptoJS.AES.decrypt(encryptedKey, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  return (
    <>
      <PageHeader />
      <Box id="page-body" className={styles.pageBody}>
        <Container>
          {isUserInstructor() ? (
            <Beak
            
              __unsafeOpenAIApiKey__={decryptApiKey(process.env.REACT_APP_OPENAPI_KEY)}
              instructions={instructorBot}
            >

              <div>

                {quizzes.map((quiz, index) => (
                  <Paper key={index} className={styles.paper}>
                    <Button onClick={() => handleRemoveQuizOption(index)}>Remove Quiz</Button>
                    <TextField
                      label="Question"
                      value={quiz.question}
                      onChange={(e) => handleQuestionChange(index, e)}
                      className={styles.questionInput}
                      fullWidth
                    />
                    {quiz.options.map((option, optionIndex) => (
                      <div key={optionIndex} className={styles.optionContainer}>
                        <TextField
                          label="Option"
                          value={option.text}
                          onChange={(e) => handleOptionChange(index, optionIndex, e)}
                          className={styles.optionInput}
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              checked={option.isCorrect}
                              onChange={() => handleCorrectChange(index, optionIndex)}
                            />
                          }
                          label="Correct"
                        />
                        <Button onClick={() => handleRemoveOption(index, optionIndex)}>Remove Option</Button>
                      </div>
                    ))}
                    <Button onClick={() => handleAddOption(index)}>Add Option</Button>
                  </Paper>
                ))}
                <Button onClick={handleAddQuiz}>Add Quiz</Button>

              </div>
              {
                isUserInstructor() &&
                <AssistantWindow />
              }

            </Beak>
          ) : (
            <Beak
              __unsafeOpenAIApiKey__={decryptApiKey(process.env.REACT_APP_OPENAPI_KEY)}
              instructions={studentBot}
            >
              {
                <ChatbotTask chatbotContent={quizzes} />
              }
              <div>
                {
                  quizzes.map((quiz, index) => (
                    <Paper key={index} className={styles.paper}>
                      <Typography variant="h6">{quiz.question}</Typography>
                      <RadioGroup>
                        {quiz.options.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            control={<Radio />}
                            label={option.text}
                            value={optionIndex}
                            checked={quiz.selectedOption === optionIndex}
                            onChange={() => handleOptionSelect(index, optionIndex)}
                          />
                        ))}
                      </RadioGroup>
                    </Paper>
                  ))
                }
                {isUserStudent() && !submitted && (
                  <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                )}
              </div>
              {
                isHintAllowed &&
                <AssistantWindow />
              }
              {
                submitted && isHintAllowed &&
                <GetChatBotInfo />
              }


            </Beak>


          )}
        </Container>
      </Box >


      {
        isUserInstructor() &&
        <Box className={styles.footer}>
          <PrimaryBtn onClick={handleReset}>Reset</PrimaryBtn>
          <PrimaryBtn onClick={handleSave}>Save</PrimaryBtn>
        </Box>

      }
      {
        isUserStudent() &&
        <Box className={styles.footer}>
          {/* <Button variant="contained" color="primary" disabled={!submitted}>Back</Button> */}
          <Button variant="contained" color="primary" disabled={!submitted} onClick={handleNextPage}>Next</Button>
        </Box>

      }

      <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={hanldeSnackbarClose}>
        <Alert severity={snackType} onClose={hanldeSnackbarClose}>{message}</Alert>
      </Snackbar>

    </>

  );
}
