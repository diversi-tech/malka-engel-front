import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Modal, Link, CircularProgress } from '@mui/material';
import { useConnectUser } from './useConnectUser';
import useValidation from './useValidation';
import { LoginUser } from '../../axios/UsersAxios';

export const Login = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [errorLoginingin, setErrorLoginingin] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { validForm, emailError, passwordError } = useValidation();
  const { ConnectMe } = useConnectUser();

  const handleClose = () => {
    navigate(-1);
  };

  const handleLogin = async () => {
    if (validForm(user)) {
      setLoading(true);
      try {
        const userLogin = await LoginUser({ email: user.email, passwordHash: user.passwordHash });
        if (userLogin != null && userLogin.status === 200) {
          ConnectMe();
          navigate(-1);
        } else if (userLogin.code === "ERR_BAD_RESPONSE") {
          setErrorLoginingin(true);
        } else {
          alert("Network Error");
        }
      } catch (error) {
        alert("Network Error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={showModal} onClose={handleClose} aria-labelledby="login-modal-title" aria-describedby="login-modal-description">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ width: '100%', maxWidth: 500, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {t('loginPage.title')}
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <TextField
              fullWidth
              label={t('loginPage.email')}
              type="email"
              margin="normal"
              onChange={(e) => { validForm(user); setUser({ ...user, email: e.target.value }); }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              label={t('loginPage.password')}
              type="password"
              margin="normal"
              onChange={(e) => { validForm(user); setUser({ ...user, passwordHash: e.target.value }); }}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Box sx={{ mt: 2 }}>
              <Link href="/myResetPassword" variant="body2">
                {t('loginPage.forgot')}
              </Link>
            </Box>
            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : t('loginPage.loginButton')}
            </Button>
            {errorLoginingin && <Typography color="error" align="center" sx={{ mt: 2 }}>{t('loginPage.errorLoging')}</Typography>}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {t('loginPage.noAccount')}
              <Link href="/mySignUp" color="secondary" underline="hover">
                {t('loginPage.createAccount')}
              </Link>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
