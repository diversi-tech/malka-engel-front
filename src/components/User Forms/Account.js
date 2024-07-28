import React from 'react';
import { useSelector } from 'react-redux';
import { Profile } from './Profile';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { OrderHistory } from '../Order/OrderHistory';

export const Account = () => {
    const { t } = useTranslation();
    const connected = useSelector((state) => state.DataReducer_Users.connected);

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            {!connected ? (
                <Box textAlign="center" mt={5}>
                    <Typography variant="h4" gutterBottom sx={{ color: 'RoyalPurple' }}>
                        {t('accountPage.errCon')}
                    </Typography>
                    <Link to="/myLogin" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                backgroundColor: 'Teal',
                                '&:hover': { backgroundColor: 'RoyalPurple' }
                            }}
                        >
                            {t('accountPage.signIn')}
                        </Button>
                    </Link>
                </Box>
            ) : (
                <Grid container spacing={3} mt={5}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'RoyalPurple' }}>
                                {t('accountPage.profile')}
                            </Typography>
                            <Profile />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f9f9f9' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'RoyalPurple' }}>
                                {t('accountPage.orderHistory')}
                            </Typography>
                            <OrderHistory />
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Account;
