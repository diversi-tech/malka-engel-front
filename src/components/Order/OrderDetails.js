import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetOrderByOrderId } from '../../axios/UserOrdersHistoryAxios';
import { GetOrderItemByOrdId } from '../../axios/OrderItemAxios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  Divider, 
  Container, 
  Box, 
  useTheme, 
  useMediaQuery, 
  IconButton 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../../axios/ProductAxios';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import WatermarkedImage from '../product/productDetail/WatermarkedImage';
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const OrderDetails = () => {
  debugger
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsList = useSelector(p => p.DataReducer_Products.Prodlist || []);
  const [products, setProducts] = useState(productsList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language === 'en' ? 'En' : 'He';

  useEffect(() => {
    debugger
    const fetchOrderDetails = async () => {
      debugger
      try {
        let fetchedProducts = productsList;
        if (productsList.length === 0) {
          fetchedProducts = await GetAllProducts();
          dispatch(setProductList(fetchedProducts));
        }

        const [orderResponse, orderItemsResponse] = await Promise.all([
          GetOrderByOrderId(orderId),
          GetOrderItemByOrdId(orderId),
        ]);

        const orderItemsWithProduct = orderItemsResponse.map(item => ({
          ...item,
          product: fetchedProducts.find(p => p.productID === item.productID),
        }));

        setOrder(orderResponse);
        setOrderItems(orderItemsWithProduct);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, productsList, dispatch]);

  if (loading) return <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
  if (error) return <Alert severity="error" style={{ margin: '20px' }}>Error fetching order details: {error}</Alert>;

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Order Details
      </Typography>
      {order ? (
        <Card variant="outlined" style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: theme.shadows[5] }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Typography variant="body1"><strong>Order ID:</strong> {order.orderID}</Typography>
            <Typography variant="body1"><strong>Created At:</strong> {order.createAt}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {order.status}</Typography>
            <Typography variant="body1"><strong>Total Amount:</strong> ${order.totalAmount}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" align="center">No order details available.</Typography>
      )}
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="h6" gutterBottom align="center" color="primary">
        Order Items
      </Typography>
      {orderItems && orderItems.length > 0 ? (
        orderItems.map(item => (
          <Card key={item.orderItemID} variant="outlined" style={{ marginBottom: '16px', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} md={3}>
                  <WatermarkedImage
                    alt={item.product[`name${currentLanguage}`]}
                    onClick={() => navigate(`/myProduct/${item.product.productID}`)}
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      ':hover': { transform: 'scale(1.1)' }
                    }}
                    imageUrl={`${process.env.REACT_APP_API_URL}${item.product.imageURL}`}
                    watermarkText='malka engel'
                    style={{
                      width: '100%',
                      height: isMobile ? '150px' : '250px',
                      transition: 'transform 0.2s ease-out',
                      cursor: 'pointer'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Typography variant="body1" gutterBottom><strong>Item Name:</strong> {item.product[`name${currentLanguage}`]}</Typography>
                  <Typography variant="body1" paragraph>{item.product[`description${currentLanguage}`]}</Typography>
                  <Typography variant="body1"><strong>Price:</strong> ${item.price}</Typography>
                  <Typography variant="body1"><strong>Quantity:</strong> {item.quantity}</Typography>
                  {item.product.isRecommended && (
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" style={{ marginRight: '8px' }}><strong>Recommended:</strong></Typography>
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} color="primary" style={{ fontSize: '20px' }} />
                      ))}
                    </Box>
                  )}
                  <Typography variant="body1"><strong>Comment:</strong> {item.comment}</Typography>
                  <Typography variant="body1"><strong>Wording:</strong> {item.wording}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">No items for this order!</Typography>
      )}
    </Container>
  );
};
  