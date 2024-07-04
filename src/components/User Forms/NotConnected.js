import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const UnconnectedUser = () => {
    const navigate = useNavigate();
    const { show, setShow } = useState(true);  
    const handleClose = () => {navigate(-1)};
    const handleShowLogin = () => {navigate('/myLogin')}; 

    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>אתם לא מחוברים</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>כדי להמשיך, בבקשה ללכת ל-<Button variant="link" onClick={handleShowLogin}>התחברות</Button>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  