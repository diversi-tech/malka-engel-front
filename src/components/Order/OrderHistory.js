// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { Container, Typography, Alert, AlertTitle, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
// import { GetOrderByUserId } from "../../axios/OrderAxios";

// export const OrderHistory = ({ connect }) => {
//   const { t, i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const currentUser = useSelector(state => state.DataReducer_Users.currentUser);
//   const connected = useSelector(state => state.DataReducer_Users.connected);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (connected) {
//       fetchOrders(currentUser.userID);
//     }
//   }, [connected, currentUser]);

//   const fetchOrders = async (userId) => {
//     try {
//       const response = await GetOrderByUserId(userId);
//       setOrders(response.data);
//     } catch (error) {
//       console.error(`Error fetching orders for user ${userId}:`, error);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 8 }}>
//       {!connected ? (
//         <Alert severity="error" sx={{ mb: 4 }}>
//           <AlertTitle>{t('OrderHistoryPage.not connect1')}</AlertTitle>
//           <Typography>{t('OrderHistoryPage.not connect2')}</Typography>
//         </Alert>
//       ) : (
//         <Box>
//           <Typography variant="h4" gutterBottom sx={{ color: 'RoyalPurple' }}>
//             {t('OrderHistoryPage.ordersFor')} {currentUser.name}
//           </Typography>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <List>
//               {orders.map(order => (
//                 <ListItem key={order.orderId} sx={{ mb: 2 }}>
//                   <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
//                     <ListItemText
//                       primary={`${t('OrderHistoryPage.createdAt')}: ${order.createdAt}`}
//                       primaryTypographyProps={{ style: { color: 'DarkGray' } }}
//                       secondary={
//                         <>
//                           <Typography component="span" variant="body2" color="textPrimary" sx={{ color: 'Teal' }}>
//                             {t('OrderHistoryPage.status')}: {order.status}
//                           </Typography>
//                           <br />
//                           <Typography component="span" variant="body2" color="textPrimary" sx={{ color: 'Teal' }}>
//                             {t('OrderHistoryPage.totalAmount')}: {order.totalAmount}
//                           </Typography>
//                         </>
//                       }
//                     />
//                   </Paper>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default OrderHistory;


import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Alert, AlertTitle, List, ListItem, ListItemText, Paper, Box, Button, Modal } from '@mui/material';
import { GetOrderByUserId } from "../../axios/OrderAxios";
import { GetOrderItemByOrdId } from "../../axios/OrderItemAxios";

export const OrderHistory = ({ connect }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.DataReducer_Users.currentUser);
  const connected = useSelector(state => state.DataReducer_Users.connected);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

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

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await GetOrderItemByOrdId(orderId);
      setOrderDetails(response.data);
      setSelectedOrder(orderId);
      setDetailsModalOpen(true);
    } catch (error) {
      console.error(`Error fetching details for order ${orderId}:`, error);
    }
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedOrder(null);
    setOrderDetails([]);
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
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => fetchOrderDetails(order.orderId)}
                            sx={{ mt: 1 }}
                          >
                            {t('OrderHistoryPage.viewDetails')}
                          </Button>
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

      <Modal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t('OrderHistoryPage.orderDetails')}
          </Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            {orderDetails.length === 0 ? (
              <Typography>{t('OrderHistoryPage.noDetails')}</Typography>
            ) : (
              orderDetails.map(item => (
                <Box key={item.productId} sx={{ mb: 2 }}>
                  <Typography variant="body1">{t('OrderHistoryPage.productName')}: {item.productName}</Typography>
                  <Typography variant="body2" color="textSecondary">{t('OrderHistoryPage.quantity')}: {item.quantity}</Typography>
                  <Typography variant="body2" color="textSecondary">{t('OrderHistoryPage.price')}: {item.price}</Typography>
                </Box>
              ))
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseDetailsModal}
              sx={{ mt: 2 }}
            >
              {t('OrderHistoryPage.close')}
            </Button>
          </Paper>
        </Box>
      </Modal>
    </Container>
  );
};

export default OrderHistory;
