import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, TextField, Typography, Box, Link } from '@mui/material';
import { LoginUser } from '../../axios/UsersAxios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { connect, setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import useValidation from './useValidation';

export const StayTuned = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [errorLoginingin, setErrorLoginingin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validForm, emailError, passwordError } = useValidation();

  const handleLogin = async () => {
    if (validForm(user)) {
      let userLogin = await LoginUser(user.email, user.passwordHash);
      if (userLogin != null && userLogin.status === 200) {
        dispatch(setCurrentUser(userLogin.data));
        dispatch(connect());
        navigate(-1);
      } else if (userLogin == null) {
        alert("Network Error");
      } else {
        setErrorLoginingin(true);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('loginPage.title')}
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label={t('loginPage.email')}
          margin="normal"
          variant="outlined"
          onChange={(e) => { validForm(user); setUser({ ...user, email: e.target.value }) }}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          fullWidth
          label={t('loginPage.password')}
          type="password"
          margin="normal"
          variant="outlined"
          onChange={(e) => { validForm(user); setUser({ ...user, passwordHash: e.target.value }) }}
          error={!!passwordError}
          helperText={passwordError}
        />
        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Link href="/myResetPassword" variant="body2">
            {t('loginPage.forgot')}
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          {t('loginPage.loginButton')}
        </Button>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            {t('loginPage.noAccount')}
            <Link href="/mySignUp" variant="body2" sx={{ ml: 1 }}>
              {t('loginPage.createAccount')}
            </Link>
          </Typography>
          {errorLoginingin && <Typography color="error" variant="body2" sx={{ mt: 2 }}>{t('loginPage.errorLoging')}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
