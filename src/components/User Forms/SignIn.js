import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Modal, Link, CircularProgress } from '@mui/material';
import { LoginUser } from '../../axios/UsersAxios';
import useValidation from './useValidation';
import { useConnectUser } from './useConnectUser';

export const Login = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for showing progress

  const navigate = useNavigate();
  const { validForm, emailError, passwordError } = useValidation();
  const { ConnectMe } = useConnectUser();

  const handleClose = () => {
    navigate(-1);
  };

  const handleLogin = async () => {
    if (validForm(user)) {
      setLoading(true); // Set loading to true before making the API call
      try {
        const userLogin = await LoginUser({ email: user.email, passwordHash: user.passwordHash });
        if (userLogin?.status === 200) {
          ConnectMe();
          navigate(-1);
        } else if (userLogin?.code === "ERR_BAD_RESPONSE") {
          setErrorLoggingIn(true);
        }
        else {
          // Handle different error status codes and navigate to the error page
          if (userLogin?.status === 500) {
            navigate(`/myErrorPage/500/${t('errorPage.message500')}/back`);
          } else if (userLogin?.status === 401) {
            navigate(`/myErrorPage/401/${t('errorPage.message401')}/back`);
          } else {
            navigate(`/myErrorPage/${userLogin?.status || '500'}/${t('Check your internet connection')}/back`);
          }
        }
      } catch (error) {
        console.error(error);
        navigate(`/myErrorPage/500/${t('errorPage.message500')}/back`);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    }
  };

  return (
    <Modal open={showModal} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          textAlign: 'center'
        }}
      >
        {!errorLoggingIn ? (
          <>
            <Typography variant="h4" gutterBottom color="primary">
              {t('loginPage.title')}
            </Typography>
            <TextField
              label={t('loginPage.email')}
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) => { validForm(user); setUser({ ...user, email: e.target.value }); }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label={t('loginPage.password')}
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) => { validForm(user); setUser({ ...user, passwordHash: e.target.value }); }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Link href="/#/myResetPassword" variant="body2" sx={{ display: 'block', mt: 1, color: 'secondary.main' }}>
              {t('loginPage.forgot')}
            </Link>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 3 }}
              disabled={loading} // Disable the button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t('loginPage.loginButton')}
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {t('loginPage.noAccount')}{' '}
              <Link href="/#/mySignUp" variant="body2" sx={{ color: 'secondary.main' }}>
                {t('loginPage.createAccount')}
              </Link>
            </Typography>
          </>
        ) : (
          <Box>
            <Typography variant="h6" color="error" gutterBottom>
              {t('loginPage.errorLoggingIn')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setErrorLoggingIn(false)}
              sx={{ mt: 2 }}
            >
              {t('loginPage.tryAgain')}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ mt: 2, ml: 1 }}
            >
              {t('loginPage.goBack')}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Login;
