// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import useValidation from './useValidation';
// import { SendEmailToReset } from '../../axios/EmailAxios';
// import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
// import theme from '../../createTheme'; 

// export const ResetPassword = () => {
//   const { t } = useTranslation();
//   const [emailRequest, setEmailRequest] = useState({
//     toAddress: '',
//     subject: 'Email to reset password',
//     body: 'Click on this link...........',
//     isBodyHtml: false
//   });
//   const [emailError, setEmailError] = useState('');
//   const [restSec, setRestSec] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { validateEmail } = useValidation();

//   const handleClose = () => { navigate(-2); };

//   const handleClick = async () => {
//     if (!validateEmail(emailRequest.toAddress)) {
//       setEmailError(t('resetPasswordPage.invalidEmail'));
//     } else {
//       setEmailError('');
//       setLoading(true);
//       try {
//         // Send email to reset the password
//         let result = await SendEmailToReset({ ToAddress: emailRequest.toAddress });
//         if (result && result.status === 200) {
//           setRestSec(true);
//         } else {
//           alert('Network error: ');
//         }
//       } catch (error) {
//         console.error('Error sending email:', error);
//         alert('Network error: ');
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
//           {restSec ? t('resetPasswordPage.secMassage') : t('resetPasswordPage.title')}
//         </Typography>
//         {!restSec && (
//           <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} textAlign="center">
//             <TextField
//               label={t('resetPasswordPage.putEmail')}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               type="email"
//               value={emailRequest.toAddress}
//               onChange={(e) => setEmailRequest({ ...emailRequest, toAddress: e.target.value })}
//               error={!!emailError}
//               helperText={emailError}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleClick}
//               sx={{ mt: 2 }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : t('resetPasswordPage.resetButton')}
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Modal>
//   );
// };


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useValidation from './useValidation';
import { SendEmailToReset } from '../../axios/EmailAxios';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import theme from '../../createTheme';

export const ResetPassword = () => {
  const { t } = useTranslation();
  const [emailRequest, setEmailRequest] = useState({
    toAddress: '',
    subject: 'Email to reset password',
    body: 'Click on this link...........',
    isBodyHtml: false
  });
  const [emailError, setEmailError] = useState('');
  const [restSec, setRestSec] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { validateEmail } = useValidation();

  const handleClose = () => { navigate(-2); };

  const handleClick = async () => {
    if (!validateEmail(emailRequest.toAddress)) {
      setEmailError(t('resetPasswordPage.invalidEmail'));
    }
    else {
      setEmailError('');
      setLoading(true);
      try {
        let result = await SendEmailToReset({ ToAddress: emailRequest.toAddress });
        if (result && result.status === 200) {
          setRestSec(true);
        }
         else {
          alert('Network error: ');
        }
      } 
      catch (error) {
        console.error('Error sending email:', error);
        alert('Network error: ');
      } 
      finally {
        setLoading(false);
      }
    }
  };

  const modalStyle = {
    width: '80%',
    height: 'auto',
    maxWidth: '600px',
    padding: theme.spacing(4),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f5f5f5', // Light grey background
    borderRadius: theme.shape.borderRadius, // Rounded corners
    boxShadow: theme.shadows[5],
  };

  const textStyle = {
    color: '#333333', // Dark Gray text for readability
  };

  return (
    <Modal open onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" align="center" mb={3} sx={textStyle}>
          {restSec ? t('resetPasswordPage.secMassage') : t('resetPasswordPage.title')}
        </Typography>
        {!restSec && (
          <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} textAlign="center">
            <TextField
              label={t('resetPasswordPage.putEmail')}
              fullWidth
              margin="normal"
              variant="outlined"
              type="email"
              value={emailRequest.toAddress}
              onChange={(e) => setEmailRequest({ ...emailRequest, toAddress: e.target.value })}
              error={!!emailError}
              helperText={emailError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#008080', // Teal border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#004d4d', // Darker Teal border color on hover
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary" // Secondary color for the button
              fullWidth
              onClick={handleClick}
              sx={{
                mt: 2,
                backgroundColor: '#008080', // Teal color for button
                '&:hover': {
                  backgroundColor: '#004d4d', // Darker Teal color on hover
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t('resetPasswordPage.resetButton')}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ResetPassword;
