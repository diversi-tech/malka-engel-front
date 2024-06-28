import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CategoriesManager = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1', description: 'Description of Category 1' },
    { id: 2, name: 'Category 2', description: 'Description of Category 2' },
    // וכן הלאה לכמה קטגוריות כפי שנדרש
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoriesToDelete, setCategoriesToDelete] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    // קוד להוספת קטגוריה חדשה
    setShowAddForm(false);
  };

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(cat => !categoriesToDelete.includes(cat.id));
    setCategories(updatedCategories);
    setCategoriesToDelete([]);
    setCategoryToDelete(null);
    // ניתן להוסיף כאן קוד למחיקה אמיתית מהדטה
    setShowDeleteModal(false);
  };

  const handleCheckboxChange = (categoryId) => {
    if (categoriesToDelete.includes(categoryId)) {
      setCategoriesToDelete(categoriesToDelete.filter(id => id !== categoryId));
    } else {
      setCategoriesToDelete([...categoriesToDelete, categoryId]);
    }
  };

  const handleDeleteModalShow = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <h2 className="mt-4">Admin Screen - ניהול קטגוריות</h2>

      <div className="mt-4">
        <Button variant="primary" onClick={() => setShowAddForm(true)}>הוספת קטגוריה</Button>
        <Button variant="danger" onClick={handleDeleteModalShow}>מחיקת קטגוריה</Button>
      </div>

      <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>הוספת קטגוריה חדשה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCategory}>
            <Form.Group>
              <Form.Label>שם  </Form.Label>
              <Form.Control type="text" placeholder="הכנס שם קטגוריה בעברית" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>תיאור  </Form.Label>
              <Form.Control type="text" placeholder="הכנס תיאור קטגוריה בעברית" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>  name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name in English" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>  description</Form.Label>
              <Form.Control type="text" placeholder="Enter category description in English" required />
            </Form.Group>
            <Button variant="primary" type="submit">הוסף קטגוריה</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>מחיקת קטגוריה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>בחר את הקטגוריות למחיקה:</p>
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                {category.name} - {category.description}
                <input
                  type="checkbox"
                  checked={categoriesToDelete.includes(category.id)}
                  onChange={() => handleCheckboxChange(category.id)}
                />
              </li>
            ))}
          </ul>
          <Button variant="danger" onClick={handleDeleteCategory}>מחק קטגוריות שנבחרו</Button>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default CategoriesManager;
