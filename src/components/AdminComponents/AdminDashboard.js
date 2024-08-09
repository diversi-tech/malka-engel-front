import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Modal, Form, Row, Col } from 'react-bootstrap';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { GetAllProducts, PostProduct, PutProduct } from '../../axios/ProductAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const productsList = useSelector((s) => s.DataReducer_Products?.Prodlist || []);
  const [products, setProducts] = useState(productsList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [prdoId, setPrdoId] = useState('');
  const [nameHe, setNameHe] = useState('');
  const [descriptionHe, setDescriptionHe] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [image, setImage] = useState(null);
  const [recommaned, setRecommaned] = useState(false);
  const myDispatch = useDispatch();
  const navigate = useNavigate();
  const [newE, setNewE] = useState({
    IsRecommended: false,
    image: '',
    SalePrice: '',
    Price: '',
    DescriptionEn: '',
    DescriptionHe: '',
    NameEn: '',
    NameHe: '',
    ProductID: '',
    ImageURL: '',
    CreatedAt: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostProduct(newE);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setNewE({
        ...newE,
        [name]: checked
      });
    } else if (name === 'image') {
      setNewE({
        ...newE,
        [name]: files[0]
      });
    } else {
      setNewE({
        ...newE,
        [name]: value
      });
    }
  };

  async function fetchProducts() {
    try {
      if (!productsList || productsList.length === 0) {
        const response = await GetAllProducts();
        if (!response) {
          setProducts([]);
        } else {
          setProducts(response);
          myDispatch(setProductList(response));
        }
      } else {
        setProducts(productsList);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowAddModal = () => {
    setSelectedProduct('');
    setPrdoId('');
    setNameHe('');
    setDescriptionHe('');
    setNameEn('');
    setDescriptionEn('');
    setPrice('');
    setSalePrice('');
    setRecommaned(false);
    setImage(null);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowUpdateModal = (product) => {
    setSelectedProduct(product);
    setPrdoId(product.productID);
    setNameHe(product.nameHe);
    setDescriptionHe(product.descriptionHe);
    setNameEn(product.nameEn);
    setDescriptionEn(product.descriptionEn);
    setPrice(product.price);
    setSalePrice(product.salePrice);
    setRecommaned(product.isRecommended);
    setImage(null); // Assuming you do not pre-fill the image in update modal
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = {
      NameHe: nameHe,
      DescriptionHe: descriptionHe || null,
      Price: parseFloat(price) || null,
      SalePrice: parseFloat(salePrice) || null,
      NameEn: nameEn,
      DescriptionEn: descriptionEn || null,
      IsRecommended: recommaned,
      ImageURL: image ? URL.createObjectURL(image) : ''
    };

    try {
      const response = await PostProduct(formData);
      if (response) {
        const productsFromServer = await GetAllProducts();
        myDispatch(setProductList(productsFromServer));
        handleCloseAddModal();
      }
    } catch (error) {
      console.error('Error adding product:', error.response || error.message);
      alert('Failed to add product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ProductID', prdoId);
    formData.append('NameHe', nameHe);
    formData.append('DescriptionHe', descriptionHe || '');
    formData.append('Price', parseFloat(price) || '');
    formData.append('SalePrice', parseFloat(salePrice) || '');
    formData.append('NameEn', nameEn);
    formData.append('DescriptionEn', descriptionEn || '');
    formData.append('IsRecommended', recommaned);
    if (image) {
        formData.append('image', image);
    }

    try {
        const response = await PutProduct(formData);
        if (response) {
            const productsFromServer = await GetAllProducts();
            myDispatch(setProductList(productsFromServer));
            handleCloseUpdateModal();
        }
    } catch (error) {
        console.error('Error updating product:', error.response || error.message);
        alert('Failed to update product');
    }
};

  const handleShowConfirmDeleteModal = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmDeleteModal(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setProductIdToDelete(null);
    setShowConfirmDeleteModal(false);
  };

  return (
    <Container>
      <div className="mb-3">
        <Button variant="primary" onClick={handleShowAddModal}>Add Product</Button>
      </div>
      <ListGroup className="mb-4">
        {products.map((product, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={3}>
                <div className="product-image-container">
                  <img
                    src={product.imageURL}
                    alt={`Product ${index}`}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </Col>
              <Col md={7}>
                <h5><b>Id: </b>{product.productID}</h5>
                <h4>{product.nameEn} / {product.nameHe}</h4>
                <p>{product.descriptionEn} / {product.descriptionHe}</p>
                <p>Price: {product.price}</p>
                <p>Sale Price: {product.salePrice}</p>
              </Col>
              <Col md={2}>
                <Button variant="outline-primary" onClick={() => handleShowUpdateModal(product)}>
                  <FaPen />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formIsRecommended">
                <Form.Label>Is Recommended</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="IsRecommended"
                  checked={newE.IsRecommended}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formSalePrice">
                <Form.Label>Sale Price</Form.Label>
                <Form.Control
                  type="number"
                  name="SalePrice"
                  value={newE.SalePrice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="Price"
                  value={newE.Price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionEn">
                <Form.Label>Description (English)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="DescriptionEn"
                  value={newE.DescriptionEn}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionHe">
                <Form.Label>Description (Hebrew)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="DescriptionHe"
                  value={newE.DescriptionHe}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNameEn">
                <Form.Label>Name (English)</Form.Label>
                <Form.Control
                  type="text"
                  name="NameEn"
                  value={newE.NameEn}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formNameHe">
                <Form.Label>Name (Hebrew)</Form.Label>
                <Form.Control
                  type="text"
                  name="NameHe"
                  value={newE.NameHe}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">Add Product</Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleUpdateProduct}>
              <Form.Group controlId="formProductID">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  type="text"
                  value={prdoId}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formNameHe">
                <Form.Label>Name (Hebrew)</Form.Label>
                <Form.Control
                  type="text"
                  value={nameHe}
                  onChange={(e) => setNameHe(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionHe">
                <Form.Label>Description (Hebrew)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={descriptionHe}
                  onChange={(e) => setDescriptionHe(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNameEn">
                <Form.Label>Name (English)</Form.Label>
                <Form.Control
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionEn">
                <Form.Label>Description (English)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formSalePrice">
                <Form.Label>Sale Price</Form.Label>
                <Form.Control
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formIsRecommended">
                <Form.Check
                  type="checkbox"
                  label="Is Recommended"
                  checked={recommaned}
                  onChange={(e) => setRecommaned(e.target.checked)}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">Update Product</Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>Product added successfully!</h5>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;

