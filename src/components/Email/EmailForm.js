import React, { useState } from 'react';
import { Container, TextField, Button, Modal, Box, Typography } from '@mui/material';
import { addEmail } from '../../axios/EmailAxios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const EmailForm = () => {
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [newE, setNewE] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewE({
      ...newE,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set submitted to true to trigger validation messages
    if (!newE.name || !newE.email || !/\S+@\S+\.\S+/.test(newE.email)) {
      return; // Prevent form submission if validation fails
    }
    setError(''); // Reset error before new request
    try {
      await addEmail(newE);
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate(-1) // Close the modal after 2 seconds
      }, 2000);
      
    } catch (err) {
      if(err.status == 500)
        navigate(`/myErrorPage/500/${t('errorPage.message500')}/back`)
      else if(err.status == 404)
        navigate(`/myErrorPage/404/${t('errorPage.message404')}/back`)
      else if(err.status == 403) 
        navigate(`/myErrorPage/403/${t('errorPage.message400')}/back`)
      else
        navigate(`/myErrorPage/---/${t('errorPage.message')}/back`)
      setError(t('EmailFormPage.error'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h6" gutterBottom>
         {t('EmailFormPage.join')}
        </Typography>
        <TextField
          label={t('EmailFormPage.name')}
          name="name"
          value={newE.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={submitted && !newE.name}
          helperText={submitted && !newE.name ? t('EmailFormPage.fillField') : ''}
        />
        <TextField
          label={t('EmailFormPage.emailAddress')}
          name="email"
          type="email"
          value={newE.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={submitted && (!newE.email || !/\S+@\S+\.\S+/.test(newE.email))}
          helperText={submitted && (!newE.email || !/\S+@\S+\.\S+/.test(newE.email)) ?  t('EmailFormPage.emailField') : ''}
        />
        <TextField
          label={t('EmailFormPage.message')}
          name="message"
          value={newE.message}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
        {t('EmailFormPage.send')}

        </Button>
      </Box>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            padding: 3,
            borderRadius: 1,
            boxShadow: 24,
            width: '300px',
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
              {t('EmailFormPage.successMessage')}
          </Typography>
          <Typography variant="body1">
              {t('EmailFormPage.mailinglistMessage')}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default EmailForm;
