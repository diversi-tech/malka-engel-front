import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import usFlag from '../../assets/flags/us_flag.png';
// import ilFlag from '../../assets/flags/il_flag.png';
import { useSelector } from "react-redux";
import { useConnectUser } from "../../User Forms/useConnectUser";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import theme from '../../../createTheme';
import { ThemeProvider } from '@mui/material/styles';
import { GetAllCategories } from '../../../axios/CategoryAxios';
import '../../../scc/home.style.css'
import { DivWrapper } from './DivWrapper';

// Define new color palette
const colors = {
    primaryBg: '#000000', // Black background
    primaryText: '#ffffff', // White text
    accent1: '#ff5722', // Red-Orange accent
    accent2: '#009688', // Teal accent
    hoverBg: '#333333', // Dark gray for hover
    menuBg: '#222222', // Dark gray for menu background
    menuItemHover: '#444444', // Medium gray for menu item hover
};

export const CopyNav = () => {
    const { t, i18n } = useTranslation();
    const currentUser = useSelector(s => s.DataReducer_Users.currentUser);
    const connected = useSelector(s => s.DataReducer_Users.connected);
    const { Logout } = useConnectUser();
    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = useState(null);
    const [categoryMenuAnchorEl, setCategoryMenuAnchorEl] = useState(null);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === 'he' ? 'rtl' : 'ltr';
    };

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        setCategoryMenuAnchorEl(null);
        setUserMenuAnchorEl(null);
    };

    const fetchCategories = async () => {
        try {
            const categories = await GetAllCategories();
            setCategories(categories.filter(category => category.upCategory === 0));
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert("An error occurred while fetching the categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryMenu = (event) => setCategoryMenuAnchorEl(event.currentTarget);
    const handleUserMenu = (event) => setUserMenuAnchorEl(event.currentTarget);

    return (
      <DivWrapper></DivWrapper>
    //     <div className="frame">
    //   <div className="div">
    //     <div className="frame-wrapper">
    //       <div className="line-wrapper">
    //         <img className="line" alt="Line" src="line-6.svg" />
    //       </div>
    //     </div>
    //     <div className="img-wrapper">
    //       <img className="img" alt="Line" src="image.svg" />
    //     </div>
    //     <div className="div-wrapper">
    //       <div className="line-wrapper">
    //         <img className="line-2" alt="Line" src="line-6-2.svg" />
    //       </div>
    //     </div>
    //     <div className="frame-wrapper-2">
    //       <div className="line-wrapper-2">
    //         <img className="line-3" alt="Line" src="line-6-3.svg" />
    //       </div>
    //     </div>
    //     <div className="div-2">
    //       <div className="text-wrapper">צור קשר</div>
    //       <div className="text-wrapper-2">המלצות</div>
    //       <div className="text-wrapper-2">מוצרים</div>
    //       <div className="text-wrapper-2">מי אנחנו</div>
    //       <div className="text-wrapper-3">עמוד בית</div>
    //     </div>
    //     <div className="div-3" />
    //   </div>
    // </div>
    );

    //     <ThemeProvider theme={theme}>
    //         <AppBar position="static" sx={{ backgroundColor: colors.primaryBg }}>
    //             <Container>
    //                 <Toolbar>
    //                     <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
    //                         <MenuIcon />
    //                     </IconButton>
    //                     <Typography
    //                         variant="h6"
    //                         component={Link}
    //                         to="/"
    //                         sx={{ flexGrow: 1, textDecoration: 'none', color: colors.primaryText, fontWeight: 'bold' }}
    //                     >
    //                         Designery
    //                     </Typography>
    //                     <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
    //                         <IconButton
    //                             color="inherit"
    //                             component={Link}
    //                             to="./myShoppingCart"
    //                             sx={{ color: colors.primaryText }}
    //                         >
    //                             <FontAwesomeIcon icon={faShoppingCart} />
    //                         </IconButton>
    //                         <Button
    //                             color="inherit"
    //                             component={Link}
    //                             to="./myHome"
    //                             sx={{
    //                                 color: colors.primaryText,
    //                                 '&:hover': { backgroundColor: colors.hoverBg },
    //                                 borderRadius: 0, // No border radius for a cleaner look
    //                                 textTransform: 'none', // Preserve text case
    //                                 padding: '8px 16px', // Consistent padding
    //                             }}
    //                         >
    //                             {t('navPage.linkHome')}
    //                         </Button>
    //                         <Button
    //                             color="inherit"
    //                             component={Link}
    //                             to="./myCommonQuestions"
    //                             sx={{
    //                                 color: colors.primaryText,
    //                                 '&:hover': { backgroundColor: colors.hoverBg },
    //                                 borderRadius: 0,
    //                                 textTransform: 'none',
    //                                 padding: '8px 16px',
    //                             }}
    //                         >
    //                             {t('navPage.linCommonQuestions')}
    //                         </Button>
    //                         {!connected && (
    //                             <Button
    //                                 color="inherit"
    //                                 component={Link}
    //                                 to="./myLogin"
    //                                 sx={{
    //                                     color: colors.primaryText,
    //                                     '&:hover': { backgroundColor: colors.hoverBg },
    //                                     borderRadius: 0,
    //                                     textTransform: 'none',
    //                                     padding: '8px 16px',
    //                                 }}
    //                             >
    //                                 {t('navPage.linkLogin')}
    //                             </Button>
    //                         )}
    //                         <Button
    //                             color="inherit"
    //                             component={Link}
    //                             to="./myEmailForm"
    //                             sx={{
    //                                 color: colors.primaryText,
    //                                 '&:hover': { backgroundColor: colors.hoverBg },
    //                                 borderRadius: 0,
    //                                 textTransform: 'none',
    //                                 padding: '8px 16px',
    //                             }}
    //                         >
    //                             {t('navPage.linkStayTuned')}
    //                         </Button>
    //                         {connected && currentUser.typeID === 3 && (
    //                             <Button
    //                                 color="inherit"
    //                                 component={Link}
    //                                 to={`./AllAdminPages/${token}`}
    //                                 sx={{
    //                                     color: colors.primaryText,
    //                                     '&:hover': { backgroundColor: colors.hoverBg },
    //                                     borderRadius: 0,
    //                                     textTransform: 'none',
    //                                     padding: '8px 16px',
    //                                 }}
    //                             >
    //                                 מסכי ניהול
    //                             </Button>
    //                         )}
    //                         <Button
    //                             color="inherit"
    //                             onClick={handleCategoryMenu}
    //                             sx={{
    //                                 color: colors.primaryText,
    //                                 '&:hover': { backgroundColor: colors.hoverBg },
    //                                 borderRadius: 0,
    //                                 textTransform: 'none',
    //                                 padding: '8px 16px',
    //                             }}
    //                         >
    //                             קטגוריות
    //                         </Button>
    //                         <Menu
    //                             anchorEl={categoryMenuAnchorEl}
    //                             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    //                             keepMounted
    //                             transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    //                             open={Boolean(categoryMenuAnchorEl)}
    //                             onClose={handleClose}
    //                             PaperProps={{ style: { backgroundColor: colors.menuBg } }}
    //                         >
    //                             {categories.map(category => (
    //                                 <MenuItem
    //                                     key={category.categoryID}
    //                                     component={Link}
    //                                     to={`/myProductByCategory/${category.categoryID}`}
    //                                     onClick={handleClose}
    //                                     sx={{
    //                                         color: colors.primaryText,
    //                                         '&:hover': { backgroundColor: colors.menuItemHover },
    //                                         borderRadius: 0, // No border radius
    //                                     }}
    //                                 >
    //                                     {category.nameHe}
    //                                 </MenuItem>
    //                             ))}
    //                         </Menu>
    //                         {connected ? (
    //                             <div>
    //                                 <MenuItem
    //                                     onClick={handleUserMenu}
    //                                     sx={{
    //                                         color: colors.primaryText,
    //                                         '&:hover': { backgroundColor: colors.menuItemHover },
    //                                         borderRadius: 0, // No border radius
    //                                     }}
    //                                 >
    //                                     {currentUser.name}
    //                                 </MenuItem>
    //                                 <Menu
    //                                     anchorEl={userMenuAnchorEl}
    //                                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //                                     keepMounted
    //                                     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //                                     open={Boolean(userMenuAnchorEl)}
    //                                     onClose={handleClose}
    //                                     PaperProps={{ style: { backgroundColor: colors.menuBg } }}
    //                                 >
    //                                     <MenuItem component={Link} to="./myAccount" onClick={handleClose}>
    //                                         Account
    //                                     </MenuItem>
    //                                     <MenuItem onClick={Logout}>
    //                                         Logout
    //                                     </MenuItem>
    //                                 </Menu>
    //                             </div>
    //                         ) : (
    //                             <MenuItem sx={{ color: colors.primaryText }}>
    //                                 NOT CONNECTED
    //                             </MenuItem>
    //                         )}
    //                         {i18n.language !== 'en' && (
    //                             <IconButton onClick={() => handleLanguageChange('en')}>
    //                                 <img src={usFlag} alt="English" style={{ width: '25px', height: '20px' }} />
    //                             </IconButton>
    //                         )}
    //                         {i18n.language !== 'he' && (
    //                             <IconButton onClick={() => handleLanguageChange('he')}>
    //                                 <img src={ilFlag} alt="Hebrew" style={{ width: '25px', height: '20px' }} />
    //                             </IconButton>
    //                         )}
    //                     </Box>
    //                 </Toolbar>
    //             </Container>
    //         </AppBar>
    //     </ThemeProvider>
    // );
};
