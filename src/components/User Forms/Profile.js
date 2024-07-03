import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'user123',
    phone: '123-456-7890',
    email: 'user@example.com',
    password: 'password123',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // כאן אפשר להוסיף לוגיקה לשמירת הנתונים לשרת
    console.log('Profile data saved:', profileData);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">פרופיל</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>שם משתמש</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>סיסמה</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>

            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>
                שמור
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEdit}>
                ערוך
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

