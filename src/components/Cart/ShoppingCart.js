import { useTranslation } from 'react-i18next';
import { Typography, Box, Button, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartDisplay } from './CartDisplay';
import { getCart } from '../product/cookies/SetCart';

export const ShoppingCart = () => {
    const { t } = useTranslation();
    const cart = getCart();

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <ShoppingCartIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4">{t('shoppingCartPage.title')}</Typography>
            </Box>
            {cart.length === 0 ? (
                <Typography variant="body1">{t('shoppingCartPage.p1')}</Typography>
            ) : (
                <CartDisplay />
            )}
        </Container>
    );
};
