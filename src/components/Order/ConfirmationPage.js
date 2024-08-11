import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../createTheme';

export const ConfirmationPage = () => {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: 3,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
                    >
                        {t('confirmationPage.title')}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ mb: 2, textAlign: 'center' }}
                    >
                        {t('confirmationPage.message')}
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ textAlign: 'center', color: 'text.secondary' }}
                    >
                        {t('confirmationPage.footer')}
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ConfirmationPage;
