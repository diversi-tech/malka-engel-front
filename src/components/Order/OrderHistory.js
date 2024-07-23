import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Alert, AlertTitle, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { GetOrderByUserId } from "../../axios/OrderAxios";

export const OrderHistory = ({ connect }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.DataReducer_Users.currentUser);
  const connected = useSelector(state => state.DataReducer_Users.connected);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (connected) {
      fetchOrders(currentUser.userID);
    }
  }, [connected, currentUser]);

  const fetchOrders = async (userId) => {
    try {
      const response = await GetOrderByUserId(userId);
      setOrders(response.data);
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      {!connected ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          <AlertTitle>{t('OrderHistoryPage.not connect1')}</AlertTitle>
          <Typography>{t('OrderHistoryPage.not connect2')}</Typography>
        </Alert>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom sx={{ color: 'RoyalPurple' }}>
            {t('OrderHistoryPage.ordersFor')} {currentUser.name}
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <List>
              {orders.map(order => (
                <ListItem key={order.orderId} sx={{ mb: 2 }}>
                  <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
                    <ListItemText
                      primary={`${t('OrderHistoryPage.createdAt')}: ${order.createdAt}`}
                      primaryTypographyProps={{ style: { color: 'DarkGray' } }}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary" sx={{ color: 'Teal' }}>
                            {t('OrderHistoryPage.status')}: {order.status}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textPrimary" sx={{ color: 'Teal' }}>
                            {t('OrderHistoryPage.totalAmount')}: {order.totalAmount}
                          </Typography>
                        </>
                      }
                    />
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default OrderHistory;
