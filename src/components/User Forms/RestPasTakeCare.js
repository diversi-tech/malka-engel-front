import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Grid, Typography, TextField, Button, Modal } from '@mui/material';
import useValidation from './useValidation';
import { ResetPas } from '../../axios/UsersAxios';
import { ValidToken } from '../../axios/TokenAxios';

export const ResetPasTakeCare = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const [pas, setPas] = useState({});
  const [passwordError1, setPasswordError] = useState('');
  const currentUser = useSelector(s => s.DataReducer_Users.currentUser);
  const [current, setCurrent] = useState(currentUser);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [resetSec, setRestSec] = useState(false);

  const { passwordError, passwordComfirmError, validPasswordError } = useValidation();

  const handleClose = () => { window.close(); };

  const validToken = async () => {
    debugger
    const result = await ValidToken(token)
    if (result && result.data)
      setShowModal(true)
    else {
      navigate(`/myErrorPage/${404}/${"דף לא נמצא"}/${"close"}`)
    }
  }
  const handleClick = async () => {
    if (validPasswordError(pas.password1, pas.password2)) {
      let result = await ResetPas(token, pas.password1)
      if (result != null && result.data) {
        setRestSec(true)
      }
      else
      navigate(`/myErrorPage/${400}/${"  איפוס סיסמא נכשל נסה שוב"}/${"back"}`)
    }
  }

  const style3 = {
    ' width': '100%',
    ' height': '700px',
    'border': '5px'
  }

  useEffect(() => {
    validToken();
  }, []);

  return (
    <Modal open={showModal} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 600, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
        {resetSec ? (
          <Typography variant="h5" align="center">
            {t('resetPasswordCarePage.alertMessage')}
          </Typography>
        ) : (
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              {t('resetPasswordCarePage.title')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('resetPasswordCarePage.password1')}
                  type="password"
                  variant="outlined"
                  onChange={(e) => { validPasswordError(pas.password1, pas.password2); setPas({ ...pas, password1: e.target.value }) }}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('resetPasswordCarePage.password2')}
                  type="password"
                  variant="outlined"
                  onChange={(e) => { validPasswordError(pas.password1, pas.password2); setPas({ ...pas, password2: e.target.value }) }}
                  error={!!passwordComfirmError}
                  helperText={passwordComfirmError}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" color="primary" onClick={handleClick}>
                  {t('resetPasswordCarePage.resetButton')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
        <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
