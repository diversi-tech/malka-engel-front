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
                backgroundColor: '#f8f9fa',
                padding: 2,
                borderTop: '1px solid #ccc',
                position: 'relative',
                mt: 'auto',
            }}
        >
            <Container>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    <MUILink component={Link} to="./myCommonQuestions" color="textPrimary" underline="none">
                        {t('footerPage.linkCommonQuestions')}
                    </MUILink>
                    <MUILink component={Link} to="./MyAccount" color="textPrimary" underline="none">
                        {t('footerPage.linkMyAccount')}
                    </MUILink>
                    <MUILink component={Link} to="./myContact" color="textPrimary" underline="none">
                        {t('footerPage.linkContact')}
                    </MUILink>
                    <MUILink component={Link} to="./myDesignerBirkins" color="textPrimary" underline="none">
                        {t('footerPage.linkDesignerBirkins')}
                    </MUILink>
                    <MUILink component={Link} to="./myCongratulationsToTheDonors" color="textPrimary" underline="none">
                        {t('footerPage.linkCongratulationsToTheDonors')}
                    </MUILink>
                    <MUILink component={Link} to="./myJoys" color="textPrimary" underline="none">
                        {t('footerPage.linkJoys')}
                    </MUILink>
                    <MUILink component={Link} to="./myEvents" color="textPrimary" underline="none">
                        {t('footerPage.linkEvents')}
                    </MUILink>
                    <MUILink component={Link} to="./myLogin" color="textPrimary" underline="none">
                        {t('footerPage.linkLogin')}
                    </MUILink>
                    <MUILink component={Link} to="./myTerms" color="textPrimary" underline="none">
                        {t('footerPage.linkTerms')}
                    </MUILink>
                </Box>
                <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
                    כל הזכויות שמורות@
                </Typography>
            </Container>
        </Box>
    );
};
