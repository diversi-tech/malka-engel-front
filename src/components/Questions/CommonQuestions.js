import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCommonQuestions } from '../../axios/CommonQuestionsAxios';
import { setFAQlist } from '../../redux/DataActions/DataActions.FAQ';
import { Box, Container, TextField, Typography, Collapse, Card, CardContent, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const CommonQuestions = () => {
  const { t } = useTranslation();
  const FAQlist = useSelector((state) => state.DataReducer_FAQ.FAQlist);
  const [questionsList, setQuestionsList] = useState(FAQlist);
  const [openIndex, setOpenIndex] = useState(null);
  const [errorFetch, setErrorFetch] = useState(false);
  const dispatch = useDispatch();

  // Function to fetch FAQ data
  const fetchData = async () => {
    if (FAQlist.length === 0) {
      try {
        const result = await getCommonQuestions();
        if (result && result.status === 200) {
          setQuestionsList(result.data);
          dispatch(setFAQlist(result.data));
        } else {
          setErrorFetch(true);
        }
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
        setErrorFetch(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [FAQlist, dispatch]);

  // Handle search input change
  const handleChange = (event) => {
    setQuestionsList(FAQlist.filter((q) => 
      q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())
    ));
  };

  // Handle toggle for question collapse
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('CommonQuestionsPage.title')}
      </Typography>
      <TextField
        label={t('CommonQuestionsPage.serchTitle')}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      {errorFetch ? (
        <Typography variant="h6" color="error">
          Network Error
        </Typography>
      ) : (
        questionsList.map((item, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleToggle(index)}
              >
                <Typography variant="h6">
                  {item[t('CommonQuestionsPage.question')]}
                </Typography>
                <IconButton>
                  {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={openIndex === index}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    {item[t('CommonQuestionsPage.answer')]}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    {item.rating}
                  </Typography>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};
