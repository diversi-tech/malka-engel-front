import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Offcanvas } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import OrderManager from './OrderManager';
import UserAdmin from './UserAdmin';
import AllCategories from './AllCategories';
import EmailForm from '../Email/EmailForm';
import MailingList from '../Email/MailingList';
import SeEmails from '../Email/SeEmails';
import { Message } from '../Email/Messages';
import { AdminCommonQuestions } from './CommonQuestions';
import { ValidToken } from '../../axios/TokenAxios';
import { useSelector } from 'react-redux';
// import { sendEmailsForAllUsers } from '../../axios/EmailAxios';

const AllAdminPages = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { token } = useParams();
  const { currentUser, connected } = useSelector(u => u.DataReducer_Users);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const navigate = useNavigate();
  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
    handleClose();
  };
  const validToken= async()=>{
    debugger
    const result = await ValidToken(token)
    if(result && result.data && currentUser&& currentUser.typeID === 3)
    {
      handleShow();  
    }
    else{
      navigate(`/myErrorPage/${403}/${"אין לך הרשאה לגשת לדף זה"}/${"back"}`)
    
    }  
   }
  useEffect(() => {
    validToken()
  }, [location]);

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
      case 'SeEmail':
        return <SeEmails />;
      case 'MailingList':
        return <MailingList />;
      case 'Message':
        return <Message />;
      case 'AdminCommonQuestions':
        return <AdminCommonQuestions />;
      default:
        return null;
    }
  };
 

  return (
    <Container fluid>
      <Row>
        <Col md={9}>
          {activeComponent && renderComponent()}
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
              className="mb-3"
              onClick={() => handleComponentChange('UserAdmin')}
              block
            >
              ניהול משתמשים
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('SeEmail')}
              block
            >
              שליחת מייל ללקוח
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('MailingList')}
              block
            >
              שליחת מייל לרשימת תפוצה
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('Message')}
              block
            >
              הצגות הודעות
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => handleComponentChange('AdminCommonQuestions')}
              block
            >
              שאלות נפוצות
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default AllAdminPages;
