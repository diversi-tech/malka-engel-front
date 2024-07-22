import { t } from "i18next";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useNavigation } from "react-router-dom";

export const PopUp = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate()
    const handleClose = () =>  {navigate("/myHome")};
    const handleShow = () => setShowModal(true);



    return (<>


      <Modal show={showModal} onHide={handleClose}>
        {/* <Modal.Header closeButton> */}
          <Modal.Title>{t('popUpPage.modalTitle')}</Modal.Title>
        {/* </Modal.Header> */}
        <Modal.Body>
          <p>תודה.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Add additional buttons if needed */}
        </Modal.Footer>
      </Modal>
      </>
    );
}