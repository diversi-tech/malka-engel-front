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

  const handleChange = (event) => {
    setQuestionsList(
      FAQlist.filter((q) =>
        q[t('CommonQuestionsPage.question')].toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        {t('CommonQuestionsPage.title')}
      </Typography>
      <TextField
        label={t('CommonQuestionsPage.searchTitle')}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      {errorFetch ? (
        <Typography variant="h6" color="error" align="center">
          Network Error
        </Typography>
      ) : (
        questionsList.map((item, index) => (
          <Card key={index} sx={{ mb: 1, transition: 'transform 0.2s', ':hover': { transform: 'scale(1.02)' } }}>
            <CardContent sx={{ padding: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                  pb: 1
                }}
                onClick={() => handleToggle(index)}
              >
                <Typography variant="body1">
                  {item[t('CommonQuestionsPage.question')]}
                </Typography>
                <IconButton size="small">
                  {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={openIndex === index}>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    {item[t('CommonQuestionsPage.answer')]}
                  </Typography>
                  {/* <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                    {item.rating}
                  </Typography> */}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};
