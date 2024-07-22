import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export const MailingList = () => {
  const [newCampaign, setNewCampaign] = useState({
    Subject: '',
    HtmlContent: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessModal(true); // הצגת חלון מודאלי להצלחה
    setTimeout(() => {
      setShowSuccessModal(false); // סגירת חלון מודאלי אחרי 2 שניות
    }, 2000);

    try {
      const response = await axios.post("https://localhost:7297/api/Mailchimp/send-campaign", {
        Subject: newCampaign.Subject,
        HtmlContent: newCampaign.HtmlContent
      });

      console.log('Campaign sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending campaign:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({
      ...newCampaign,
      [name]: value
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="Subject"
            value={newCampaign.Subject}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formHtmlContent">
          <Form.Label>HTML Content</Form.Label>
          <Form.Control
            as="textarea"
            name="HtmlContent"
            value={newCampaign.HtmlContent}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          שלח
        </Button>
      </Form>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>נשלח בהצלחה</Modal.Body>
      </Modal>
    </Container>
  );
};

export default MailingList;
