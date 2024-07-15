import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { SendEmails } from '../../axios/EmailAxios';
export const SeEmails = () => {
  const [newE, setNewE] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    SendEmails(newEmail);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewE({
      ...newE,
      [name]: value
    });
  };

  const newEmail = {
    "greeting": "string",
    "toAddress": "string",
    "subject": "string",
    "body": "string",
    "isBodyHtml": true,
    "message": newE.message,
    "email": newE.email,
    "name": newE.name
  }
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            defaultValue={newE.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            defaultValue={newE.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            placeholder="Enter your message"
            defaultValue={newE.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SeEmails;

