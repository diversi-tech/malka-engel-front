import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { GetAllOrders, PutOrder } from '../../axios/OrderAxios';
import { useDispatch, useSelector } from 'react-redux';
import { fillOrdersList } from '../../redux/DataActions/DataAction.Order';

const OrderManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState({ orderId: null, status: '' });
  const dispatch = useDispatch();
  const ordersList = useSelector(state => state.DataReducer_Orders.Orderslist);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Initialize orders with ordersList when component mounts
    setOrders(ordersList);
  }, [ordersList]); // Update orders when ordersList changes

  const fetchOrdersFromServer = async () => {
    try {
      if (ordersList.length === 0) {
        const response = await GetAllOrders();
        setOrders(response);
        dispatch(fillOrdersList(response));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrdersFromServer();
  }, []); // Fetch orders only once when component mounts

  const handleStatusChange = async () => {
    try {
      if (
        (orderToUpdate.status === 'Proccess' && orderToUpdate.status !== 'Completed') ||
        (orderToUpdate.status === 'Completed' && orderToUpdate.status !== 'Proccess')
      ) {
        // Update order status locally
        const updatedOrders = orders.map(order => {
          if (order.orderID === orderToUpdate.orderId) {
            return { ...order, status: orderToUpdate.status };
          }
          return order;
        });
        setOrders(updatedOrders);

        // Send PUT request to update order status in the database
        const result = await PutOrder(orderToUpdate.orderId, orderToUpdate);
        if (result) {
          const ordersListToDispatch = await GetAllOrders();
          dispatch(fillOrdersList(ordersListToDispatch));
        }
        setShowModal(false); // Close modal after successful update
      } else {
        console.error('Invalid status change');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleOpenModal = (orderId) => {
    const order = orders.find(order => order.orderID === orderId);
    if (order && (order.status === 'Pending' || order.status === 'Proccess')) {
      setOrderToUpdate({ orderId, status: order.status });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusSelection = (status) => {
    setOrderToUpdate({ ...orderToUpdate, status });
  };

  return (
    <div className="container">
      <h2 className="mt-4">ניהול הזמנות</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>שם לקוח</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.orderID}>
              <td>{index + 1}</td>
              <td>{order.userID}</td>
              <td>{order.status}</td>
              <td>
                {(order.status === 'Pending' || order.status === 'Proccess') && (
                  <Button variant="primary" onClick={() => handleOpenModal(order.orderID)}>
                    שנה סטטוס
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>שינוי סטטוס הזמנה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>בחר סטטוס חדש להזמנה:</p>
          {orderToUpdate.status === 'Pending' && (
            <Button variant="success" onClick={() => handleStatusSelection('Proccess')}>
              מעבר לביצוע
            </Button>
          )}
          {orderToUpdate.status === 'Proccess' && (
            <Button variant="info" onClick={() => handleStatusSelection('Completed')}>
              הזמנה הושלמה
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            שמור שינוי
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManager;
