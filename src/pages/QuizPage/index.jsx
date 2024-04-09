import React, { useEffect, useState } from 'react';
import styles from "./QuizPage.module.css";
import { PrimaryBtn } from '../../components/StyledMUIElem';
// import { Box, InputLabel, MenuItem, Stack, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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




export default function CodingPage() {

  const { user } = useAuth();
  const [startTime, setStartTime] = useState();

  const [quizzes, setQuizzes] = useState([]);

  const handleAddQuiz = () => {
    if (quizzes.length < 10) {
      setQuizzes([...quizzes, { question: '', options: [{ text: '', isCorrect: false }] }]);
    }
  };

  const handleReset = () => {
    setQuizzes([]);
  };

  const handleSave = () => {
    const quizData = quizzes.map((quiz) => ({
      question: quiz.question,
      options: quiz.options.map((option) => ({ text: option.text, isCorrect: option.isCorrect }))
    }));
    console.log(quizData);
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

  const handleSubmit = () => {
    const quizResults = quizzes.map((quiz) => ({
      question: quiz.question,
      selectedOption: quiz.selectedOption
    }));
    console.log(quizResults);
  };

  const isUserStudent = () => {
    return user.role == "student";
  }

  const isUserInstructor = () => {
    return user.role == "instructor";
  }

  useEffect(() => {
    let response = sampleData['getQuizPage'].response;
    setQuizzes(response.questions);
  }, []);

  return (
    <>
      <PageHeader />
      <Box id="page-body" className={styles.pageBody}>
        <Container>
          {!isUserInstructor() ? (
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
              <Button onClick={handleReset}>Reset</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          ) : (
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
              < Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </div>


          )}
        </Container>
      </Box >
      <Box className={styles.footer}>
        <PrimaryBtn variant="contained" color="primary" >Back</PrimaryBtn>
        <PrimaryBtn variant="contained" color="primary" >Next</PrimaryBtn>
      </Box>
    </>

  );
}
