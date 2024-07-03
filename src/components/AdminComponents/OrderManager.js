import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

export const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState({ orderId: null, status: '' });

  useEffect(() => {
    const fetchOrdersFromServer = async () => {
      try {
        const response = await axios.get('https://localhost:7297/api/orders/GetAllOrders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersFromServer();
  }, []);

  const handleStatusChange = async () => {
    try {
      if (
        (orderToUpdate.status === 'Proccess' && orderToUpdate.status !== 'Completed') ||
        (orderToUpdate.status === 'Completed' && orderToUpdate.status !== 'Proccess')
      ) {
        await axios.put(`https://localhost:7297/api/orders/PutOrder/${orderToUpdate.orderId}`, orderToUpdate);
        const updatedOrders = orders.map(order => {
          if (order.orderID === orderToUpdate.orderId) {
            return { ...order, status: orderToUpdate.status };
          }
          return order;
        });
        setOrders(updatedOrders);
        setShowModal(false);
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

