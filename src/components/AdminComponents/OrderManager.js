import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // כאן יש לכתוב קוד לטעינת ההזמנות מהשרת או מבסיס הנתונים
    // לדוגמה:
    // fetchOrdersFromServer();
    const dummyOrders = [
      { id: 1, customer: 'Customer A', status: 'Pending' },
      { id: 2, customer: 'Customer B', status: 'Pending' },
      { id: 3, customer: 'Customer C', status: 'Completed' },
      { id: 4, customer: 'Customer D', status: 'Pending' },
    ];
    setOrders(dummyOrders);
  }, []);

  const handleStatusChange = () => {
    // כאן יש לכתוב קוד לשינוי סטטוס ההזמנה בשרת או בבסיס הנתונים
    // לדוגמה:
    // updateOrderStatus(selectedOrderId, 'בוצע');
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrderId) {
        return { ...order, status: 'בוצע' }; // עדכון הסטטוס במערך המקומי
      }
      return order;
    });
    setOrders(updatedOrders);
    setShowModal(false);
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Pending' && (
                  <Button variant="primary" onClick={() => handleOpenModal(order.id)}>
                    שנה ל"בוצע"
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
          <p>האם לשנות את סטטוס ההזמנה ל"בוצע"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            אישור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManager;
