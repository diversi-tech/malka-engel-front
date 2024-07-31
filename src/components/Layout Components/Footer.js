import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, Link as MUILink } from '@mui/material';

export const Footer = ({ showOnScroll }) => {
    const [showFooter, setShowFooter] = useState(showOnScroll);
    const { t } = useTranslation();

    useEffect(() => {
        if (showOnScroll) {
            const handleScroll = () => {
                const isScrollable = document.body.scrollHeight > window.innerHeight;
                setShowFooter(isScrollable);
            };

            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Check initial scroll position
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setShowFooter(true); // Always show the footer if showOnScroll is false
        }
    }, [showOnScroll]);

    if (!showFooter) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'primary.main',
                padding: 2,
                borderTop: '1px solid #ccc',
                mt: 'auto',
                color: 'secondary.contrastText',
                flexDirection: 'column',
            }}
        >
            <Container>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    <MUILink component={Link} to="./myCommonQuestions" color="inherit" underline="none">
                        {t('footerPage.linkCommonQuestions')}
                    </MUILink>
                    <MUILink component={Link} to="./MyAccount" color="inherit" underline="none">
                        {t('footerPage.linkMyAccount')}
                    </MUILink>
                    <MUILink component={Link} to="./myContact" color="inherit" underline="none">
                        {t('footerPage.linkContact')}
                    </MUILink>
                    <MUILink component={Link} to="./myDesignerBentchers" color="inherit" underline="none">
                        {t('footerPage.linkDesignerBirkins')}
                    </MUILink>
                    <MUILink component={Link} to="./myDonorThank-Yous" color="inherit" underline="none">
                        {t('footerPage.linkCongratulationsToTheDonors')}
                    </MUILink>
                    <MUILink component={Link} to="./mySimchos" color="inherit" underline="none">
                        {t('footerPage.linkJoys')}
                    </MUILink>
                    <MUILink component={Link} to="./myEvents" color="inherit" underline="none">
                        {t('footerPage.linkEvents')}
                    </MUILink>
                    <MUILink component={Link} to="./myLogin" color="inherit" underline="none">
                        {t('footerPage.linkLogin')}
                    </MUILink>
                    <MUILink component={Link} to="./myTerms" color="inherit" underline="none">
                        {t('footerPage.linkTerms')}
                    </MUILink>
                </Box>
                <Typography variant="body2" align="center" color="secondary.contrastText" sx={{ mt: 2 }}>
                    {t('footerPage.rights')}
                </Typography>
            </Container>
        </Box>
    );
};
