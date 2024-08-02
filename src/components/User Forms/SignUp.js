// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { LoginUser, PostUser } from '../../axios/UsersAxios';
// import useValidation from './useValidation';
// import { useConnectUser } from './useConnectUser';
// import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel, Button, CircularProgress } from '@mui/material';
// import theme from '../../createTheme';

// const SignUp = () => {
//   const { t } = useTranslation();
//   const [newUser, setNewUser] = useState({
//     userID: 0,
//     name: '',
//     email: '',
//     phoneNumber: '',
//     passwordHash: '',
//     createdAt: new Date().toISOString(),
//     typeID: 1,
//     credits: 0
//   });
//   const [signsec, setSignsec] = useState(false);
//   const [errorMailExists, setErrorMailExists] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { ConnectMe } = useConnectUser();

//   // Custom Hook for Validation
//   const { validForm, emailError, passwordError, phoneNumberError } = useValidation();

//   const handleClose = () => { navigate(-2); };

//   // Function to handle Register
//   const handleRegister = async () => {
    
//     if (validForm(newUser)) {
//       setLoading(true);
//       try {
//         // Set user type
//         newUser.typeID = newUser.typeID === 2 ? 1 : 2;

//         // Post new user
//         const postUser = await PostUser(newUser);
//         if (postUser && postUser.status === 200) {
//           const userLogin = await LoginUser(newUser.email, newUser.passwordHash);
//           if (userLogin && userLogin.status === 200) {
//             ConnectMe();
//             setSignsec(true);
//           }
//         } else {
//           setErrorMailExists(true);
//         }
//       } catch (error) {
//         console.error('Error during registration:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const modalStyle = {
//     width: '80%',
//     height: 'auto',
//     maxWidth: '600px',
//     padding: theme.spacing(4)
//   };

//   return (
//     <Modal open onClose={handleClose} centered>
//       <Box sx={modalStyle}>
//         <Typography variant="h4" align="center" mb={3}>
//           {signsec ? t('signUpPage.massage') : t('signUpPage.title')}
//         </Typography>
//         {!signsec && (
//           <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
//             <TextField
//               label={t('signUpPage.userName')}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               value={newUser.name}
//               onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//             />
//             <TextField
//               label={t('signUpPage.phoneNumber')}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               type="tel"
//               value={newUser.phoneNumber}
//               onChange={(e) => {
//                 validForm(newUser);
//                 setNewUser({ ...newUser, phoneNumber: e.target.value });
//               }}
//               error={!!phoneNumberError}
//               helperText={phoneNumberError && t('signUpPage.invalidphoneNumber')}
//             />
//             <TextField
//               label={t('signUpPage.email')}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               type="email"
//               value={newUser.email}
//               onChange={(e) => {
//                 validForm(newUser);
//                 setNewUser({ ...newUser, email: e.target.value });
//               }}
//               error={!!emailError}
//               helperText={emailError && t('signUpPage.invalidEmail')}
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={newUser.typeID === 2}
//                   onChange={(e) => setNewUser({ ...newUser, typeID: e.target.checked ? 2 : 1 })}
//                 />
//               }
//               label={t('signUpPage.typeName')}
//             />
//             <TextField
//               label={t('signUpPage.password')}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               type="password"
//               value={newUser.passwordHash}
//               onChange={(e) => {
//                 validForm(newUser);
//                 setNewUser({ ...newUser, passwordHash: e.target.value });
//               }}
//               error={!!passwordError}
//               helperText={passwordError && t('signUpPage.invalidPassword')}
//             />
//             {errorMailExists && <Typography color="error" align="center">{t('signUpPage.errorMailExists')}</Typography>}
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleRegister}
//               sx={{ mt: 2 }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : t('signUpPage.loginButton')}
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser, PostUser } from '../../axios/UsersAxios';
import useValidation from './useValidation';
import { useConnectUser } from './useConnectUser';
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel, Button, CircularProgress } from '@mui/material';
import theme from '../../createTheme';

const SignUp = () => {
  const { t } = useTranslation();
  const [newUser, setNewUser] = useState({
    userID: 0,
    name: '',
    email: '',
    phoneNumber: '',
    passwordHash: '',
    createdAt: new Date().toISOString(),
    typeID: 1,
    credits: 0
  });
  const [signsec, setSignsec] = useState(false);
  const [errorMailExists, setErrorMailExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ConnectMe } = useConnectUser();

  // Custom Hook for Validation
  const { validForm, emailError, passwordError, phoneNumberError } = useValidation();

  const handleClose = () => { navigate(-2); };

  // Function to handle Register
  const handleRegister = async () => {
    if (validForm(newUser)) {
      setLoading(true);
      try {
        // Set user type
        newUser.typeID = newUser.typeID === 2 ? 1 : 2;

        // Post new user
        const postUser = await PostUser(newUser);
        if (postUser && postUser.status === 200) {
          const userLogin = await LoginUser(newUser.email, newUser.passwordHash);
          if (userLogin && userLogin.status === 200) {
            ConnectMe();
            setSignsec(true);
          } else {
            setErrorMailExists(true);
          }
        } else {
          setErrorMailExists(true);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal open onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" mb={3}>
          {signsec ? t('signUpPage.successMessage') : t('signUpPage.title')}
        </Typography>
        {!signsec && (
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <TextField
              label={t('signUpPage.userName')}
              fullWidth
              margin="normal"
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              label={t('signUpPage.phoneNumber')}
              fullWidth
              margin="normal"
              variant="outlined"
              type="tel"
              value={newUser.phoneNumber}
              onChange={(e) => {
                validForm(newUser);
                setNewUser({ ...newUser, phoneNumber: e.target.value });
              }}
              error={!!phoneNumberError}
              helperText={phoneNumberError && t('signUpPage.invalidPhoneNumber')}
            />
            <TextField
              label={t('signUpPage.email')}
              fullWidth
              margin="normal"
              variant="outlined"
              type="email"
              value={newUser.email}
              onChange={(e) => {
                validForm(newUser);
                setNewUser({ ...newUser, email: e.target.value });
              }}
              error={!!emailError}
              helperText={emailError && t('signUpPage.invalidEmail')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newUser.typeID === 2}
                  onChange={(e) => setNewUser({ ...newUser, typeID: e.target.checked ? 2 : 1 })}
                />
              }
              label={t('signUpPage.typeName')}
            />
            <TextField
              label={t('signUpPage.password')}
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              value={newUser.passwordHash}
              onChange={(e) => {
                validForm(newUser);
                setNewUser({ ...newUser, passwordHash: e.target.value });
              }}
              error={!!passwordError}
              helperText={passwordError && t('signUpPage.invalidPassword')}
            />
            {errorMailExists && <Typography color="error" align="center" mb={2}>{t('signUpPage.errorMailExists')}</Typography>}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t('signUpPage.registerButton')}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SignUp;
