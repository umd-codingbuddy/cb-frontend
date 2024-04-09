import React, { useEffect, useState } from 'react';
import styles from "./CodingPage.module.css";
import { PrimaryBtn, WhiteSelect } from '../../components/StyledMUIElem';
import { Box, } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { sampleData } from '../../utils/mockData';
import PageHeader from '../../components/PageHeader';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Editor } from '@tinymce/tinymce-react';
import MonacoEditor from 'react-monaco-editor';
import { FormControl, InputLabel, MenuItem } from '@mui/material';




export default function CodingPage() {

  const { user } = useAuth();
  const [startTime, setStartTime] = useState();
  const [text, setText] = useState();
  const [code, setCode] = useState("console.log('hello world!');");
  const [language, setLanguage] = useState();

  const onCodeChange = React.useCallback((val, viewUpdate) => {
    setCode(val);
  }, []);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    let response = sampleData['getCodingPage'].response;

  }, []);

  return (
    <>
      <PageHeader />
      <Box id="page-body" className={styles.pageBody}>



        <Box className={styles.leftPane}>
          <Box className={styles.questionSection}>
            <Editor
              apiKey='1vbd7cyncb8d8rehwu3ip7x2gfj3okr0nbx603ev076paq2o'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              initialValue="Coding section is here"
            />
          </Box>
          <Box className={styles.outputSection}>
            {/* Your output content goes here */}
          </Box>
        </Box>
        <Box className={styles.rightPane}>
          <Box className={styles.codeSection}>
            <FormControl sx={{width:"200px"}}>
              <InputLabel id="language-select-label">Language</InputLabel>
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
                <MenuItem value="java">Java</MenuItem>
              </WhiteSelect>
            </FormControl>
            <MonacoEditor
              language={language}
              value={code}
              options={{
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                theme: 'vs-dark'
              }}
              onChange={(value) => setCode(value)}
            />
          </Box>
        </Box>
      </Box>
      <Box className={styles.footer}>
        <PrimaryBtn variant="contained" color="primary" >Back</PrimaryBtn>
        <PrimaryBtn variant="contained" color="primary" >Next</PrimaryBtn>
      </Box>
    </>

  );
}
