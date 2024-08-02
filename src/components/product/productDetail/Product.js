// import React, { useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useParams, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Container, Grid, Typography, Button, Box, Snackbar, Alert, Breadcrumbs } from '@mui/material';
// import { Wording } from './Wording';
// import { addToCart, getCart, removeFromCart } from '../cookies/SetCart';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { AdditionalComments } from './AdditionalComments';
// import GoBackButton from '../../Layout Components/GoBackButton';
// import { Review } from './review/Review';
// import { setCookie } from '../cookies/CookieUtils';
// import WatermarkedImage from './WatermarkedImage'; // Import the new component
// import { CategoriesHierarchyByProductId } from '../../../axios/ProductAxios';

// export const Product = () => {
//     //const params = useParams();
//     const { t, i18n } = useTranslation();
//     const { id } = useParams();
//     const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
//     const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []);
//     const [products, setProducts] = useState(productsList);
//     const [cart, setCart] = useState(getCart());
//     const [wording, setWording] = useState(cart.findIndex(item => item.productID == id) !== -1 ? cart[cart.findIndex(item => item.productID == id)].wording : '');
//     const [additionalComments, setAdditionalComments] = useState(cart.findIndex(item => item.productID == id) !== -1 ? cart[cart.findIndex(item => item.productID == id)].additionalComments : '');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const scrollToRef = useRef(null);
//     const { productId } = useParams();
//     const [breadcrumbs, setBreadcrumbs] = useState([]);

//     const product = products.find(product => product.productID == id);

//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     const productInCart = cart.find(item => item.productID === product.productID);
//     const decodedWording = productInCart ? JSON.parse(productInCart.wording) : '';
//     const initialComments = productInCart ? productInCart.additionalComments : '';

//     const handleAddToCart = product => {
//         const productWithDetails = {
//             ...product,
//             wording: JSON.stringify(wording),
//             additionalComments: additionalComments
//         };
//         addToCart(productWithDetails);
//         setCart(getCart());
//         setSnackbarMessage('הוסף בהצלחה');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//     };

//     const handleRemoveFromCart = productId => {
//         removeFromCart(productId);
//         setCart(getCart());
//         setSnackbarMessage('הוסר מהסל');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//     };

//     const handleUpdateFromCart = productId => {
//         const newCart = [...cart];
//         const productIndex = newCart.findIndex(item => item.productID === productId);
//         if (productIndex !== -1) {
//             if (newCart[productIndex].wording !== JSON.stringify(wording)) {
//                 newCart[productIndex].wording = JSON.stringify(wording);
//             }
//             if (newCart[productIndex].additionalComments != additionalComments) {
//                 newCart[productIndex].additionalComments = additionalComments;
//             }
//             setCart(newCart);
//             setCookie("cart", JSON.stringify(newCart), 7);
//             setSnackbarMessage('עודכן בהצלחה');
//             setSnackbarSeverity('success');
//             setOpenSnackbar(true);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     const getCategoryHierarchy = (categories, categoryId) => {
//         // Create a map for quick lookup
//         const categoryMap = new Map();
//         categories.forEach(cat => categoryMap.set(cat.id, cat));
    
//         // Recursively find all parent categories
//         const getHierarchy = (id) => {
//             const category = categoryMap.get(id);
//             if (!category) return [];
//             return [category, ...getHierarchy(category.upCategoryId)];
//         };
    
//         return getHierarchy(categoryId).reverse(); // reverse to get top-to-bottom order
//     };
    
//     const generateBreadcrumbs = (categories, product) => {
//         const productCategory = categories.find(cat => cat.products.includes(product.id));
    
//         if (!productCategory) return [{ name: 'Home Page', link: '/' }];
    
//         const hierarchy = getCategoryHierarchy(categories, productCategory.id);
    
//         return [
//             { name: 'Home Page', link: '/' },
//             ...hierarchy.map(cat => ({ name: cat.nameEn, link: `/categories/${cat.categp}` })),
//             { name: product.name }
//         ];
//     };

//     const fetchProductWithCategories = async (productId) => {    
//         const categoriesResponse = await CategoriesHierarchyByProductId(productId);
//         const categories = await categoriesResponse.json();
//         return  categories ;
//     };
    
//     useEffect(() => {
//         const fetchData = async () => {
//             const { product, categories } = await fetchProductWithCategories(productId);
//             const breadcrumbs = generateBreadcrumbs(categories, product);
//             setBreadcrumbs(breadcrumbs);
//         };

//         fetchData();
//     }, [productId]);


//     // Example breadcrumb data
//     // const breadcrumbs = [
//     //     { name: 'Home Page', link: '/' },
//     //     { name: product[`name${currentLanguage}`] }
//     // ];

//     return (
//         <Container sx={{ mt: 4 }}>
//             <Breadcrumbs aria-label="breadcrumb">
//                 {breadcrumbs.map((crumb, index) => (
//                     index < breadcrumbs.length - 1 ? (
//                         <Link key={index} to={crumb.link} style={{ textDecoration: 'none', color: '#1976d2' }}>
//                             {crumb.name}
//                         </Link>
//                     ) : (
//                         <Typography key={index} color="text.primary">
//                             {crumb.name}
//                         </Typography>
//                     )
//                 ))}
//             </Breadcrumbs>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//                 <Grid item xs={12} md={6}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             overflow: 'hidden',
//                             position: 'relative',
//                             width: '100%',
//                             height: 'auto'
//                         }}
//                     >
//                         <WatermarkedImage
//                             imageUrl={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
//                             watermarkText='malka engel'
//                             style={{
//                                 width: '100%',
//                                 height: 'auto',
//                                 transition: 'transform 0.2s ease-out',
//                                 cursor: 'pointer'
//                             }}
//                         />
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Typography variant="h4" gutterBottom>{product[`name${currentLanguage}`]}</Typography>
//                     <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.6 }} gutterBottom>
//                         {product[`description${currentLanguage}`]}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" gutterBottom>
//                         מחיר: {product.price} ש"ח
//                     </Typography>
//                     <Wording setWording={setWording} initialValue={decodedWording} />
//                     <AdditionalComments setAdditionalComments={setAdditionalComments} initialValue={initialComments} />
//                     <Box mt={2}>
//                         {productInCart ? (
//                             <>
//                                 <Grid container spacing={2} alignItems="center">
//                                     <Grid item>
//                                         <Button
//                                             variant="contained"
//                                             color="secondary"
//                                             onClick={() => handleRemoveFromCart(product.productID)}
//                                         >
//                                             <DeleteIcon /> {t('הסר מהסל ')}
//                                         </Button>
//                                     </Grid>
//                                     <Grid item>
//                                         <Button
//                                             variant="contained"
//                                             color="secondary"
//                                             onClick={() => handleUpdateFromCart(product.productID)}
//                                         >
//                                             <EditIcon /> {t(' ערוך מוצר ')}
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                                 <Box mt={2}>
//                                     <Snackbar
//                                         open={openSnackbar}
//                                         autoHideDuration={6000}
//                                         onClose={handleCloseSnackbar}
//                                         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//                                     >
//                                         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                                             {snackbarMessage}
//                                         </Alert>
//                                     </Snackbar>
//                                 </Box>
//                             </>
//                         ) : (
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={() => handleAddToCart(product)}
//                             >
//                                 {t('הוסף לסל ')}
//                             </Button>
//                         )}
//                     </Box>
//                 </Grid>
//             </Grid>
//             <Grid container justifyContent="center" sx={{ mt: 10 }}>
//                 <Grid item xs={12}>
//                     <Box ref={scrollToRef}>
//                         <Review productId={id} />
//                     </Box>
//                 </Grid>
//             </Grid>
//             <GoBackButton />
//         </Container>
//     );
// };


import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Button, Box, Snackbar, Alert, Breadcrumbs } from '@mui/material';
import { Wording } from './Wording';
import { addToCart, getCart, removeFromCart } from '../cookies/SetCart';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AdditionalComments } from './AdditionalComments';
import GoBackButton from '../../Layout Components/GoBackButton';
import { Review } from './review/Review';
import { setCookie } from '../cookies/CookieUtils';
import WatermarkedImage from './WatermarkedImage'; // Import the new component
import { CategoriesHierarchyByProductId } from '../../../axios/ProductAxios';

export const Product = () => {
    debugger
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const currentLanguage = i18n.language === 'en' ? 'En' : 'He';
    const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []);
    const [products, setProducts] = useState(productsList);
    const [cart, setCart] = useState(getCart());
    const [wording, setWording] = useState(cart.find(item => item.productID == id)?.wording || '');
    const [additionalComments, setAdditionalComments] = useState(cart.find(item => item.productID == id)?.additionalComments || '');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const scrollToRef = useRef(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const product = products.find(product => product.productID == id);

    useEffect(() => {
        debugger
        const fetchData = async () => {
            if (!product) return;

            const categoriesResponse = await CategoriesHierarchyByProductId(id);
            //const categories = await categoriesResponse.json();
            const breadcrumbs = generateBreadcrumbs(categoriesResponse, product);
            setBreadcrumbs(breadcrumbs);
        };

        fetchData();
    }, [id, product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productInCart = cart.find(item => item.productID === product.productID);
    const decodedWording = productInCart ? JSON.parse(productInCart.wording) : '';
    const initialComments = productInCart ? productInCart.additionalComments : '';

    const handleAddToCart = product => {
        const productWithDetails = {
            ...product,
            wording: JSON.stringify(wording),
            additionalComments: additionalComments
        };
        addToCart(productWithDetails);
        setCart(getCart());
        setSnackbarMessage('הוסף בהצלחה');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleRemoveFromCart = productId => {
        removeFromCart(productId);
        setCart(getCart());
        setSnackbarMessage('הוסר מהסל');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    const handleUpdateFromCart = productId => {
        const newCart = [...cart];
        const productIndex = newCart.findIndex(item => item.productID === productId);
        if (productIndex !== -1) {
            if (newCart[productIndex].wording !== JSON.stringify(wording)) {
                newCart[productIndex].wording = JSON.stringify(wording);
            }
            if (newCart[productIndex].additionalComments !== additionalComments) {
                newCart[productIndex].additionalComments = additionalComments;
            }
            setCart(newCart);
            setCookie("cart", JSON.stringify(newCart), 7);
            setSnackbarMessage('עודכן בהצלחה');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const getCategoryHierarchy = (categories, categoryID) => {
        debugger
        const categoryMap = new Map();
        categories.forEach(cat => categoryMap.set(cat.categoryID, cat));
    
        const getHierarchy = (id) => {
            const category = categoryMap.get(id);
            if (!category) return [];
            return [category, ...getHierarchy(category.upCategory)];
        };
    
        return getHierarchy(categoryID).reverse();
    };
    
    const generateBreadcrumbs = (categories, product) => {
        debugger
    
        if (!categories) return [{ name: 'Home Page', link: '/' }];
    
        const hierarchy = getCategoryHierarchy(categories, categories[categories.length - 1].categoryID);
    
        return [
            { name: 'Home Page', link: '/' },
            ...hierarchy.map(cat => ({ name: cat[`name${currentLanguage}`] , link: `/myProductByCategory/${cat.categoryID}` })),
            { name: product[`name${currentLanguage}`] }
        ];
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                    index < breadcrumbs.length - 1 ? (
                        <Link key={index} to={crumb.link} style={{ textDecoration: 'none', color: '#1976d2' }}>
                            {crumb.name}
                        </Link>
                    ) : (
                        <Typography key={index} color="text.primary">
                            {crumb.name}
                        </Typography>
                    )
                ))}
            </Breadcrumbs>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%',
                            height: 'auto'
                        }}
                    >
                        <WatermarkedImage
                            imageUrl={`${process.env.REACT_APP_API_URL}${product.imageURL}`}
                            watermarkText='malka engel'
                            style={{
                                width: '100%',
                                height: 'auto',
                                transition: 'transform 0.2s ease-out',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>{product[`name${currentLanguage}`]}</Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.6 }} gutterBottom>
                        {product[`description${currentLanguage}`]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        מחיר: {product.price} ש"ח
                    </Typography>
                    <Wording setWording={setWording} initialValue={decodedWording} />
                    <AdditionalComments setAdditionalComments={setAdditionalComments} initialValue={initialComments} />
                    <Box mt={2}>
                        {productInCart ? (
                            <>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveFromCart(product.productID)}
                                        >
                                            <DeleteIcon /> {t('productPage.deleteFromCart')}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleUpdateFromCart(product.productID)}
                                        >
                                            <EditIcon /> {t('productPage.editProduct')}
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={6000}
                                        onClose={handleCloseSnackbar}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    >
                                        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                                            {snackbarMessage}
                                        </Alert>
                                    </Snackbar>
                                </Box>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddToCart(product)}
                            >
                                {t('productPage.addToCart')}
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 10 }}>
                <Grid item xs={12}>
                    <Box ref={scrollToRef}>
                        <Review productId={id} />
                    </Box>
                </Grid>
            </Grid>
            <GoBackButton />
        </Container>
    );
};
