import React, { useState } from 'react';
import { Container, Grid, TextField, Button, FormControlLabel, Checkbox, Snackbar, Box, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PutUser } from '../../axios/UsersAxios';
import { setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import useValidation from './useValidation';
import { useConnectUser } from './useConnectUser';

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

export const Profile = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useSelector(s => s.DataReducer_Users.currentUser);
  const { ConnectMe } = useConnectUser();
  const [profileData, setProfileData] = useState(currentUser);
  const [isChecked, setIsChecked] = useState(profileData.typeID === 2);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

  // Custom Hook for Validation
  const { validForm, emailError, passwordError, phoneNumberError } = useValidation();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (validForm(profileData)) {
      try {
        let result = await PutUser(profileData);
        if (result && result.status === 200) {

          dispatch(setCurrentUser(profileData));
          
          setIsEditing(false);
        }
        else {
          setSnackbarMessage('Network error');
          setOpenSnackbar(true);
        }
      } catch (error) {
        setSnackbarMessage('Network error');
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'RoyalPurple' }}>
        {t('profilePage.title')}
      </Typography>
      <Box
        component="form"
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
        <TextField
          label={t('profilePage.userName')}
          name="username"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          InputProps={{
            readOnly: !isEditing,
            sx: { color: isEditing ? 'black' : 'gray' }
          }}
          fullWidth
        />

        <TextField
          label={t('profilePage.phoneNumber')}
          name="phone"
          value={profileData.phoneNumber}
          onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
          InputProps={{
            readOnly: !isEditing,
            sx: { color: isEditing ? 'black' : 'gray' }
          }}
          fullWidth
          error={Boolean(phoneNumberError)}
          helperText={phoneNumberError ? t('signUpPage.invalidphoneNumber') : ''}
        />

        <TextField
          label={t('profilePage.email')}
          name="email"
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          InputProps={{
            readOnly: !isEditing,
            sx: { color: isEditing ? 'black' : 'gray' }
          }}
          fullWidth
          error={Boolean(emailError)}
          helperText={emailError ? t('signUpPage.invalidEmail') : ''}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                const newTypeID = !isChecked ? 2 : 1;
                setProfileData({ ...profileData, typeID: newTypeID });
                setIsChecked(!isChecked);
              }}
              disabled={!isEditing}
              sx={{ color: isEditing ? 'primary' : 'gray' }}
            />
          }
          label={t('signUpPage.typeName')}
        />

        <TextField
          label={t('profilePage.password')}
          name="password"
          type="password"
          value={profileData.passwordHash}
          onChange={(e) => setProfileData({ ...profileData, passwordHash: e.target.value })}
          InputProps={{
            readOnly: !isEditing,
            sx: { color: isEditing ? 'black' : 'gray' }
          }}
          fullWidth
          error={Boolean(passwordError)}
          helperText={passwordError ? t('signUpPage.invalidPassword') : ''}
        />

        <Button
          variant={isEditing ? "contained" : "outlined"}
          color="primary"
          onClick={isEditing ? handleSave : handleEdit}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: isEditing ? 'Teal' : 'RoyalPurple',
            '&:hover': { backgroundColor: isEditing ? 'RoyalPurple' : 'Teal' }
          }}
        >
          {isEditing ? t('profilePage.saveButton') : t('profilePage.editButton')}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        action={
          <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
            Close
          </Button>
        }
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
