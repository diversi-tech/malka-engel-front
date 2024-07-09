import React, { useState } from 'react';
import { Button, Container, Row, Col, Offcanvas } from 'react-bootstrap';
import AdminDashboard from './AdminDashboard';
import OrderManager from './OrderManager';
import UserAdmin from './UserAdmin';
import AllCategories from './AllCategories';

const AllAdminPages = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
    handleClose();
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AdminDashboard':
        return <AdminDashboard />;
      case 'AllCategories':
        return <AllCategories />;
      case 'OrderManager':
        return <OrderManager />;
      case 'UserAdmin':
        return <UserAdmin />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <h1 className="my-4">ניהול מוצרים</h1>
      <Row>
        <Col md={9}>
          {activeComponent && renderComponent()}
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={handleShow}
            style={{
              backgroundColor: 'black',
              color: 'white',
              width: '150px',
              height: '50px'
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            ניהול מסכים
          </Button>
        </Col>
      </Row>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ניהול מסכים</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('AdminDashboard')}
              block
            >
              ניהול מוצרים
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('AllCategories')}
              block
            >
              ניהול קטגוריות
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('OrderManager')}
              block
            >
              ניהול הזמנות
            </Button>
            <Button
              variant="primary"
              onClick={() => handleComponentChange('UserAdmin')}
              block
            >
              ניהול משתמשים
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default AllAdminPages;
