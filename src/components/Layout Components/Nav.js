import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import usFlag from '../../assets/flags/us_flag.png';
import ilFlag from '../../assets/flags/il_flag.png';
import { useSelector } from "react-redux";
import { useConnectUser } from "../User Forms/useConnectUser";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import theme from '../../createTheme';
import { ThemeProvider } from '@mui/material/styles';

export const Nav = () => {
    const { t, i18n } = useTranslation();
    const currentUser = useSelector(s => s.DataReducer_Users.currentUser);
    const connected = useSelector(s => s.DataReducer_Users.connected);
    const { Logout } = useConnectUser();
    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === 'he') {
            document.body.dir = 'rtl';
        } else {
            document.body.dir = 'ltr';
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                            Designery
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button color="inherit" component={Link} to="./myShoppingCart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Button>
                            <Button color="inherit" component={Link} to="./myHome">
                                {t('navPage.linkHome')}
                            </Button>
                            <Button color="inherit" component={Link} to="./myCommonQuestions">
                                {t('navPage.linCommonQuestions')}
                            </Button>
                            {!connected && <Button color="inherit" component={Link} to="./myLogin">
                                {t('navPage.linkLogin')}
                            </Button>}
                            {connected && <Button color="inherit" onClick={Logout}>
                                Logout
                            </Button>}
                            <Button color="inherit" component={Link} to="./myProductList">
                                {t('navPage.linkProduct')}
                            </Button>
                            <Button color="inherit" component={Link} to="./myAccount">
                                Account
                            </Button>
                            <Button color="inherit" component={Link} to="./myEmailForm">
                                {t('navPage.linkStayTuned')}
                            </Button>
                            {connected && currentUser.typeID === 3 && (
                                <Button color="inherit" component={Link} to={`./AllAdminPages/${token}`}>
                                    מסכי ניהול
                                </Button>
                            )}
                            <Typography variant="body1" style={{ marginLeft: '10px', color: connected ? theme.palette.text.primary : theme.palette.text.secondary }}>
                                {connected ? currentUser.name : "NOT CONNECTED"}
                            </Typography>
                            {i18n.language !== 'en' && (
                                <IconButton onClick={() => handleLanguageChange('en')}>
                                    <img src={usFlag} alt="English" style={{ width: '25px', height: '20px' }} />
                                </IconButton>
                            )}
                            {i18n.language !== 'he' && (
                                <IconButton onClick={() => handleLanguageChange('he')}>
                                    <img src={ilFlag} alt="Hebrew" style={{ width: '25px', height: '20px' }} />
                                </IconButton>
                            )}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to="./myShoppingCart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </MenuItem>
                                <MenuItem component={Link} to="./myHome">{t('navPage.linkHome')}</MenuItem>
                                <MenuItem component={Link} to="./myCommonQuestions">{t('navPage.linCommonQuestions')}</MenuItem>
                                {!connected && <MenuItem component={Link} to="./myLogin">{t('navPage.linkLogin')}</MenuItem>}
                                {connected && <MenuItem onClick={Logout}>Logout</MenuItem>}
                                <MenuItem component={Link} to="./myProductList">{t('navPage.linkProduct')}</MenuItem>
                                <MenuItem component={Link} to="./myAccount">Account</MenuItem>
                                <MenuItem component={Link} to="./myEmailForm">{t('navPage.linkStayTuned')}</MenuItem>
                                {connected && currentUser.typeID === 3 && (
                                    <MenuItem component={Link} to={`./AllAdminPages/${token}`}>
                                        מסכי ניהול
                                    </MenuItem>
                                )}
                                <MenuItem>
                                    {connected ? currentUser.name : "NOT CONNECTED"}
                                </MenuItem>
                                {i18n.language !== 'en' && (
                                    <MenuItem onClick={() => handleLanguageChange('en')}>
                                        <img src={usFlag} alt="English" style={{ width: '25px', height: '20px' }} />
                                    </MenuItem>
                                )}
                                {i18n.language !== 'he' && (
                                    <MenuItem onClick={() => handleLanguageChange('he')}>
                                        <img src={ilFlag} alt="Hebrew" style={{ width: '25px', height: '20px' }} />
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
