import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from "./CodingPage.module.css";
import { PrimaryBtn, WhiteSelect } from '../../components/StyledMUIElem';
import { Alert, Box, Button, IconButton, Snackbar, Stack, TextareaAutosize, Tooltip, Typography, } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Editor } from '@tinymce/tinymce-react';
import MonacoEditor from 'react-monaco-editor';
// import { ControlledEditor as MonacoEditor } from "@monaco-editor/react";
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';




// import ChatbotTask from "../../components/ChatbotTask";

import { AssistantWindow, Beak, useBeakFunction } from "@beakjs/react";
import ChatbotTask from '../../components/ChatbotTask';
import { useNavigate, useSearchParams } from 'react-router-dom';
import backendCall from '../../utils/network';




export default function CodingPage() {

  const { user } = useAuth();
  const [text, setText] = useState();
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("console.log('hello world!');");
  const [language, setLanguage] = useState('python');
  const editorRef = useRef(null);

  const [expectedOutput, setExpectedOutput] = useState('');
  const [actualOutput, setActualOutput] = useState('');
  const [failedInput, setFailedInput] = useState('');

  const [searchParams,] = useSearchParams();
  const [pageId, setPageId] = useState('');
  const [message, setMessage] = useState('');
  const [snackType, setSnackType] = useState('success');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [passedTestCasesCount, setPassedTestCasesCount] = useState(0);


  const [canGoNext, setCanGoNext] = useState(false);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(null);
  const [isHintAllowed, setIsHintAllowed] = useState(false);
  const [nextPageId, setNextPageId] = useState('');
  const [nextPageType, setNextPageType] = useState('');
  const navigate = useNavigate();

  const instructorBot = "Assistant is running on a coding page where the instructor should create coding question, testcases which is just the string the code should return, and the programming language the code should be created by students and the user is instructor. You should help instructor in creating coding page for their course.";
  const studentBot = "You are learning assistant for students. you should help students in understanding the coding problem and answer questions only in the context of coding and nothing else. Don't give direct code answers to students because you should help them learn and not give answers directly.";

  const onCodeChange = React.useCallback((val, viewUpdate) => {
    setCode(val);
  }, []);

  const displaySnackBar = (snackType, message) => {
    setSnackType(snackType);
    setMessage(message);
    setIsSnackbarOpen(true);
  }

  const executeCoding = async () => {
    try {
      setFailedInput('');
      setActualOutput('');
      setExpectedOutput('');
      let response = await backendCall.post('/api/v1/academics/executecode', {
        code: code,
        language: language,
        pageId: pageId
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      let data = response.data;
      console.log(data);
      let trueCount = 0;

      for (const [key, value] of Object.entries(data.userPerformance)) {
        if (value.result) {
          trueCount++;
        } else {
          setFailedInput(key);
          setActualOutput(value.actualOutput);
          setExpectedOutput(value.expectedOutput);
        }
      }
      setPassedTestCasesCount(trueCount);
      let score = Math.floor((trueCount / testCases.length) * 100);
      await sendScore(score)
      // setNextPageId(data.pageId);
      // setNextPageType(data.pageType);
      // if (data.courseCompleted) {
      //   displaySnackBar('success', 'Course is completed successfully. Please go to course section')
      // } else {
      //   // setSubmitted(true);
      // }

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }

  }

  const hanldeSnackbarClose = () => {
    setIsSnackbarOpen(false)
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
        setCanGoNext(true);
      }

      // setCanGoNext(true);
    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }

  }

  const getCodingPage = async (pageId) => {
    try {
      let response = await backendCall.get('/api/v1/academics/getpagecontent/' + pageId, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      let content = response.data.page.pageContent;

      if (content.testCases != "") {
        setTestCases(content.testCases);
      }
      setLanguage(content.language);
      setText(content.text);
      setCode(content.code);
      // setIsHintAllowed(response.data.isHintAllowed);
      setIsHintAllowed(response.data.isHintAllowed);

    } catch (error) {
      console.error('Failed to fetch quiz page:', error);
    }
  }

  const saveCodingPage = async () => {
    let pageData = {
      pageId: pageId,
      pageContent: {
        text: text,
        language: language,
        code: code,
        testCases: testCases
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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    let pageId = searchParams.get('id');
    setPageId(pageId);
    getCodingPage(pageId);
    // let response = sampleData['getContentPage'].response;

  }, []);

  const handleSave = () => {
    console.log('Saving content:', text);
    setIsSaved(true);
    saveCodingPage();
  };

  const sendScore = async (score) => {
    let endTime = Date.now();

    let timeDif = Math.floor((endTime - startTime) / 1000);

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
    let endTime = Date.now();
    setEndTime(Date.now());
    console.log(JSON.stringify(code));
    await executeCoding();
    getNextPage();
    // console.log(`Time taken: ${Math.floor((endTime - startTime) / 1000)} seconds`);
    // console.log(`Correct answers: ${correctCount} out of ${quizzes.length}`);
  };


  const handleReset = () => {

    getCodingPage(pageId);
    // if (editorRef.current) {
    //   setText(response.content);
    //   // editorRef.current.setContent('');
    // }
  };

  const isUserStudent = () => {
    return user.role == "STUDENT";
  }

  const isUserInstructor = () => {
    return user.role == "INSTRUCTOR";
  }

  const handleEditorChange = useCallback((newContent, editor) => {
    setText(newContent);
  }, []);

  const handleAddTestCase = () => {
    if (testCases.length < 4) {
      const newTestCase = { id: testCases.length + 1, input: '', output: '' };
      const newTestCases = [...testCases, newTestCase];

      setTestCases(newTestCases);
      setSelectedTestCaseIndex(newTestCases.length - 1); // Automatically select new test case
    }
  };

  const handleNextPage = () => {
    navigate(`/page/${nextPageType}?id=${nextPageId}`);
  }

  const handleTestCaseInputChange = (value) => {
    const updatedTestCases = testCases.map((testCase, index) => {
      if (index === selectedTestCaseIndex) {
        testCase.input = value;
      }
      return testCase;
    });
    setTestCases(updatedTestCases);
  };

  const handleTestCaseOutputChange = (value) => {
    const updatedTestCases = testCases.map((testCase, index) => {
      if (index === selectedTestCaseIndex) {
        testCase.output = value;
      }
      return testCase;
    });
    setTestCases(updatedTestCases);
  }

  const handleTestCaseSelect = (index) => {
    setSelectedTestCaseIndex(index);
  };

  const handleDeleteTestCase = (index) => {
    const filteredTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(filteredTestCases);
    setSelectedTestCaseIndex(null); // Reset selection
  };

  function editorDidMount(editor, monaco) {
    editor.focus();
  }

  return (
    <>
      <PageHeader />
      <Box id="page-body" className={styles.pageBody}>

        <Box className={styles.leftPane}>
          <Box className={styles.questionSection}>
            {isUserInstructor() ? (

              <Beak
                __unsafeOpenAIApiKey__="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"
                instructions={instructorBot}
              >
                {
                  <>
                    <ChatbotTask chatbotContent={text} chatbotContentKey="current coding question" />
                    <ChatbotTask chatbotContent={testCases} chatbotContentKey="current coding test cases" />
                    <ChatbotTask chatbotContent={language} chatbotContentKey="current coding language" />
                  </>
                }
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
                  value={text}
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
                  <>
                    <ChatbotTask chatbotContent={text} chatbotContentKey="current coding question" />
                    <ChatbotTask chatbotContent={testCases} chatbotContentKey="current coding test cases" />
                    <ChatbotTask chatbotContent={language} chatbotContentKey="current coding language" />
                  </>

                }
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
                  value={text}
                  init={{
                    height: '100%',
                    width: '100%',
                    menubar: false,
                    toolbar: false,
                    resize: false
                  }}
                  disabled={!user.role || user.role === "STUDENT"}
                />
                {isHintAllowed && <AssistantWindow />}
              </Beak>
            )}
          </Box>
          <Box className={styles.outputSection}>
            {
              isUserInstructor() &&
              (
                <>
                  <Typography variant="h6">Test Cases</Typography>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                      {testCases.map((testCase, index) => (
                        <Box key={index}>
                          <Button key={index} variant="outlined" onClick={() => handleTestCaseSelect(index)}>
                            {`Test Case ${index + 1}`}
                          </Button>
                          {isUserInstructor() && (
                            <Tooltip title="Delete Test Case">
                              <IconButton onClick={() => handleDeleteTestCase(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      ))}
                      {isUserInstructor() && testCases.length < 4 && (
                        <IconButton onClick={handleAddTestCase}>
                          <AddIcon />
                        </IconButton>
                      )}
                    </Box>
                    {selectedTestCaseIndex !== null && (

                      <>
                        <Box>
                          <Typography>Input: </Typography>
                          <TextareaAutosize
                            maxRows={5}
                            className={styles.testcaseTextarea}
                            value={testCases[selectedTestCaseIndex].input}
                            onChange={(e) => handleTestCaseInputChange(e.target.value)}
                            disabled={!isUserInstructor()}
                          />
                        </Box>
                        <Box>

                          <Typography variant="span">Output: </Typography>
                          <TextareaAutosize
                            maxRows={5}
                            className={styles.testcaseTextarea}
                            value={testCases[selectedTestCaseIndex].output}
                            onChange={(e) => handleTestCaseOutputChange(e.target.value)}
                            disabled={!isUserInstructor()}
                          />
                        </Box>

                      </>

                    )}
                  </Box>
                </>
              )
            }

            {
              isUserStudent() && (
                <>
                  <Typography variant="h6">Test Case Results</Typography>
                  <Box>
                    <Typography>Total Test Cases: {testCases.length}</Typography>
                    <Typography>Passed Test Cases: {passedTestCasesCount}</Typography>
                    {failedInput != "" &&
                      <>
                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                          <span>Failed Input  :</span>
                          <TextareaAutosize
                            maxRows={5}
                            className={styles.testcaseTextarea}
                            value={failedInput}
                            disabled={true}
                          />
                        </Stack>
                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                          <span>Expected Output: </span>
                          <TextareaAutosize
                            maxRows={5}
                            className={styles.testcaseTextarea}
                            value={expectedOutput}
                            disabled={true}
                          />
                        </Stack>
                        <Stack flexDirection="row" justifyContent="center" alignItems="center">
                          <span>Actual Output: </span>
                          <TextareaAutosize
                            maxRows={5}
                            className={styles.testcaseTextarea}
                            value={actualOutput}
                            disabled={true}
                          />
                        </Stack>

                      </>
                    }

                  </Box>
                </>

              )
            }


          </Box>
        </Box>
        <Box className={styles.rightPane}>
          <Box className={styles.codeSection}>
            <Stack flexDirection="row" alignItems="center" justifyContent="center" gap={5}>
              <FormControl sx={{ width: "200px", marginBottom: '10px' }}>
                <WhiteSelect
                  labelId="language-select-label"
                  id="language-select"
                  value={language}
                  onChange={handleLanguageChange}
                  label="Language"
                  variant="outlined"
                  color="primary"
                >
                  <MenuItem value="python">Python</MenuItem>
                </WhiteSelect>
              </FormControl>
            </Stack>

            <MonacoEditor
              language="python"
              height="calc( 100% - 100px )"
              value={code}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: false,
              }}
              editorDidMount={editorDidMount}
              onChange={(value) => setCode(value)}
            />
          </Box>
        </Box>
      </Box >
      <Box className={styles.footer}>
        {isUserStudent() ? (
          <>
            <PrimaryBtn variant="contained" color="primary" onClick={handleSubmit} disabled={canGoNext}>Submit</PrimaryBtn>
            {/* <PrimaryBtn variant="contained" color="primary" disabled={!canGoNext}>Back</PrimaryBtn> */}
            <PrimaryBtn variant="contained" color="primary" disabled={!canGoNext} onClick={handleNextPage}>Next</PrimaryBtn>
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
