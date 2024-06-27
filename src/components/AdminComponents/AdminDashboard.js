import React, { useState } from 'react';
import { Container, Button, ListGroup, Modal, Form, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    nameEn: '',
    nameHe: '',
    descriptionEn: '',
    descriptionHe: '',
    price: '',
    onSale: false,
    saleAmount: 0,
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewProduct({ ...newProduct, image: imageFile });
  };

  const handleAddProduct = () => {
    if (newProduct.nameEn && newProduct.nameHe && newProduct.descriptionEn && newProduct.descriptionHe && newProduct.price && newProduct.image) {
      const productToAdd = { ...newProduct, image: URL.createObjectURL(newProduct.image) };
      setProducts([...products, productToAdd]);
      setNewProduct({
        nameEn: '',
        nameHe: '',
        descriptionEn: '',
        descriptionHe: '',
        price: '',
        onSale: false,
        saleAmount: 0,
        image: null
      });
      setShowAddModal(false);
    } else {
      alert('Please fill in all fields including the image.');
    }
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      const updatedProducts = products.filter(product => product !== selectedProduct);
      setProducts(updatedProducts);
      setSelectedProduct(null);
      setShowDeleteModal(false);
    }
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      // Implement update logic here
      setShowUpdateModal(false);
    }
  };

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleProductDeletion = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Admin Dashboard</h1>
      
      {/* כפתורי הפעולות */}
      <div className="mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>Add Product</Button>{' '}
        <Button variant="info" onClick={() => setShowUpdateModal(true)}>Update Product</Button>{' '}
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Product</Button>
      </div>

      {/* רשימת המוצרים */}
      <ListGroup className="mb-4">
        {products.map((product, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={3}>
                <img src={product.image} alt="Product" className="img-fluid" />
              </Col>
              <Col md={9}>
                <h4>{product.nameEn} - {product.nameHe}</h4>
                <p>{product.descriptionEn} - {product.descriptionHe}</p>
                <p>Price: ${product.price}</p>
                <div>
                  <Button variant="info" onClick={() => handleProductSelection(product)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleProductDeletion(product)}>Delete</Button>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* מודל להוספת מוצר */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name (English)</Form.Label>
              <Form.Control type="text" name="nameEn" value={newProduct.nameEn} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>שם המוצר (עברית)</Form.Label>
              <Form.Control type="text" name="nameHe" value={newProduct.nameHe} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Description (English)</Form.Label>
              <Form.Control type="text" name="descriptionEn" value={newProduct.descriptionEn} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>תיאור המוצר (עברית)</Form.Label>
              <Form.Control type="text" name="descriptionHe" value={newProduct.descriptionHe} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={newProduct.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>On Sale</Form.Label>
              <Form.Check type="checkbox" name="onSale" checked={newProduct.onSale} onChange={() => setNewProduct({ ...newProduct, onSale: !newProduct.onSale })} />
            </Form.Group>
            {newProduct.onSale && (
              <Form.Group className="mb-3">
                <Form.Label>Sale Amount</Form.Label>
                <Form.Control type="number" name="saleAmount" value={newProduct.saleAmount} onChange={handleInputChange} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Modal.Footer>
      </Modal>

      {/* מודל לעדכון מוצר */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name (English)</Form.Label>
                <Form.Control type="text" name="nameEn" value={selectedProduct.nameEn} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>שם המוצר (עברית)</Form.Label>
                <Form.Control type="text" name="nameHe" value={selectedProduct.nameHe} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Description (English)</Form.Label>
                <Form.Control type="text" name="descriptionEn" value={selectedProduct.descriptionEn} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>תיאור המוצר (עברית)</Form.Label>
                <Form.Control type="text" name="descriptionHe" value={selectedProduct.descriptionHe} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="price" value={selectedProduct.price} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>On Sale</Form.Label>
                <Form.Check type="checkbox" name="onSale" checked={selectedProduct.onSale} onChange={() => setSelectedProduct({ ...selectedProduct, onSale: !selectedProduct.onSale })} />
              </Form.Group>
              {selectedProduct.onSale && (
                <Form.Group className="mb-3">
                  <Form.Label>Sale Amount</Form.Label>
                  <Form.Control type="number" name="saleAmount" value={selectedProduct.saleAmount} onChange={handleInputChange} />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Current Image</Form.Label><br />
                <img src={selectedProduct.image} alt="Product" className="img-fluid" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload New Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleImageChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateProduct}>Update Product</Button>
        </Modal.Footer>
      </Modal>

      {/* מודל למחיקת מוצר */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>Are you sure you want to delete the product:</p>
              <p><strong>{selectedProduct.nameEn} - {selectedProduct.nameHe}</strong></p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteProduct}>Delete Product</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
