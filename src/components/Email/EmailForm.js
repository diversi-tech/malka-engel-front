import React, { useState } from 'react';
import { Container, TextField, Button, Modal, Box, Typography } from '@mui/material';
import { addEmail } from '../../axios/EmailAxios';

export const EmailForm = () => {
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        setShowSuccessModal(false); // Close the modal after 2 seconds
      }, 2000);
    } catch (err) {
      setError('לא הצלחנו להכניס את הנתונים. אנא בדוק את החיבור שלך לשרת ונסה שוב.');
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
          הצטרף לרשימת התפוצה
        </Typography>
        <TextField
          label="שם"
          name="name"
          value={newE.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={submitted && !newE.name}
          helperText={submitted && !newE.name ? "אנא מלא את השדה הזה" : ''}
        />
        <TextField
          label="כתובת אימייל"
          name="email"
          type="email"
          value={newE.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          error={submitted && (!newE.email || !/\S+@\S+\.\S+/.test(newE.email))}
          helperText={submitted && (!newE.email || !/\S+@\S+\.\S+/.test(newE.email)) ? "אנא מלא כתובת אימייל תקינה" : ''}
        />
        <TextField
          label="הודעה"
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
          שלח
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
            הצטרפת בהצלחה
          </Typography>
          <Typography variant="body1">
            הצטרפת בהצלחה לרשימת התפוצה שלנו!
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default EmailForm;
