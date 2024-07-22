import React from 'react';
import { useSelector } from 'react-redux';
import { Profile } from './Profile';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { OrderHistory } from '../Order/OrderHistory';

export const Account = () => {
    const { t } = useTranslation();
    const connected = useSelector((state) => state.DataReducer_Users.connected);

    return (
        <Container>
            {!connected ? (
                <Box textAlign="center" mt={5}>
                    <Typography variant="h4" gutterBottom>
                        {t('accountPage.errCon')}
                    </Typography>
                    <Link to="/myLogin" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                            {t('accountPage.signIn')}
                        </Button>
                    </Link>
                </Box>
            ) : (
                <Grid container spacing={3} mt={5}>
                    <Grid item md={6}>
                        <Profile />
                    </Grid>
                    <Grid item md={6}>
                        <OrderHistory />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
