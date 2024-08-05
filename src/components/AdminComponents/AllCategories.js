import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryList } from '../../redux/DataActions/DataAction.Category';
import { GetAllCategories, GetAllSubcategoriesByCategoryID, addCategory, updateCategory } from '../../axios/CategoryAxios';
import { Button, Modal, Form, Card, Collapse, ListGroup, Row, Col } from 'react-bootstrap';
import { addProductToCategory, deleteProductInCategory, GetAllProducts, GetProductsByCategory } from '../../axios/ProductAxios';

const AllCategories = () => {
    debugger
    const myCategory = useSelector(c => c.DataReducer_Categry.Categorylist);
    const [data, setData] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const dispatch = useDispatch();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [addedCategory, setAddedCategory] = useState('');
    const [editdCategory, setEditCategory] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [upcategories, setUpcategories] = useState();
    const [newC, setNewC] = useState({
        id: 0,
        nameHe: '',
        descriptionHe: '',
        nameEn: '',
        descriptionEn: '',
        upCategory: 0,
        ImageURL: '',
        Image: ''
    });
    async function fetchData() {
        debugger
        if (myCategory.length === 0) {
            var dataFromServer = await GetAllCategories();
            setData(dataFromServer);
            dispatch(setCategoryList(dataFromServer));
        }
        else {
            setData(myCategory);
        }
    }

    useEffect(() => {
        fetchData();
        async function fetchCategories() {
            try {
                const allCategories = await GetAllCategories();
                setCategories(allCategories);
            }
            catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        debugger
        e.preventDefault();
        // קוד להוספת קטגוריה חדשה
        const formData = new FormData();
        formData.append('nameHe', newC.nameHe);
        formData.append('descriptionHe', newC.descriptionHe);
        formData.append('nameEn', newC.nameEn);
        formData.append('descriptionEn', newC.descriptionEn);
        formData.append('upCategory', newC.upCategory);
        formData.append('ImageURL', "/images/" + newC.Image.name);
        formData.append('Image', newC.Image);
        debugger
        ///= כאן לקרוא לשרת
        try {
            var myResult = await addCategory(formData);
            if (myResult.data) {
                setAddedCategory(newC.nameHe);
                setShowSuccess(true);
                await fetchData();
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            alert("An error occurred while adding the category.");
        }
        // אפס את תיבות הטופס
        setNewC({
            id:0,
            nameHe: '',
            descriptionHe: '',
            nameEn: '',
            descriptionEn: '',
            upCategory: 0,
            ImageURL: '',
            Image: ''
        });
        setShowAddForm(false);
    };

    const handleChange = (e) => {
        debugger
        const { name, value, files } = e.target;
        if (name === "Image") {
            setNewC({
                ...newC,
                [name]: files[0]
            });
        }
        else if (name === "upCategory") {
            setNewC({
                ...newC,
                [name]: parseInt(value, 10)
            });
        }
        else {
            setNewC({
                ...newC,
                [name]: value
            });
        }
    };

    //----------- getProductByCategory

    const [products, setProducts] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const showProducts = async (categoryId) => {
        debugger
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            try {
                const products = await GetProductsByCategory(categoryId);
                setProducts(prevProducts => ({
                    ...prevProducts,
                    [categoryId]: products
                }));
                setExpandedCategories([...expandedCategories, categoryId]);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("An error occurred while fetching the products.");
            }
        }

    };
    //----------------------delete products--------------------
    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await deleteProductInCategory(productToDelete.categoryId, productToDelete.productId);
            const updatedProducts = await GetProductsByCategory(productToDelete.categoryId);
            setProducts(prevProducts => ({
                ...prevProducts,
                [productToDelete.categoryId]: updatedProducts
            }));
            setShowDeleteConfirm(false);
            setProductToDelete(null);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    const confirmDeleteProduct = (categoryId, productId) => {
        setProductToDelete({ categoryId, productId });
        setShowDeleteConfirm(true);
    };
    //------------- update category
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const handleEditCategory = async (category) => {

        try {
            const subcategories = await GetAllSubcategoriesByCategoryID(category.categoryID)
            setSubcategories(subcategories);
        }
        catch (error) {
            console.error('Error fetching subcategories:', error);
        }
        const filtered = categories.filter(cat => !subcategories.some(sub => sub.categoryID === cat.categoryID) &&  cat.categoryID!= category.categoryID);
        setFilteredCategories(filtered);

        setCurrentCategory(category);

        try {
            debugger
            const fileName = category.imageURL.substring(category.imageURL.lastIndexOf('/') + 1);
            const response = await fetch(`${process.env.REACT_APP_API_URL}${category.imageURL}`);
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: blob.type });
            setCurrentImage(file);
        }
        catch (error) {
            console.error("Error fetching current image:", error);
            alert("התמונה בעייתית לשרת יש לעדכן תמונה, בכדי לעדכן קטגןריה זו");
        }
        setNewC({
            id: category.categoryID,
            nameHe: category.nameHe,
            descriptionHe: category.descriptionHe,
            nameEn: category.nameEn,
            descriptionEn: category.descriptionEn,
            upCategory: category.upCategory,
            ImageURL: category.imageURL,
            Image: category.Image
        });
        setCurrentCategory(category);

        setShowEditForm(true);

    };

    const handleUpdateCategory = async (e) => {
        debugger
        e.preventDefault();
        try {
            debugger
            const updatedCategory = new FormData();
            updatedCategory.append('categoryID', currentCategory.categoryID);
            updatedCategory.append('nameHe', newC.nameHe);
            updatedCategory.append('descriptionHe', newC.descriptionHe);
            updatedCategory.append('nameEn', newC.nameEn);
            updatedCategory.append('descriptionEn', newC.descriptionEn);
            updatedCategory.append('upCategory', newC.upCategory);
            if (newC.Image) {
                updatedCategory.append('ImageURL', "/images/" + newC.Image.name);
                updatedCategory.append('Image', newC.Image);
            }
            else {
                updatedCategory.append('imageURL', currentImage.name);
                updatedCategory.append('image', currentImage);
            }
            setEditCategory(newC.nameHe);
            await updateCategory(currentCategory.categoryID, updatedCategory);
            fetchData();
            setShowEditForm(false);
            setShowSuccess(true);

        } catch (error) {
            console.error("Error updating category:", error);
            alert("An error occurred while updating the category.");
            alert("הבעיה יכולה להווצר בעקבות כך שלא נבחרה תמונה לעדכון, אנא בדקו בשנית")
        }

        setNewC({
            id: 0,
            nameHe: '',
            descriptionHe: '',
            nameEn: '',
            descriptionEn: '',
            upCategory: 0,
            ImageURL: '',
            Image: ''
        });
    };
    //---------------------------add productto category

    const [allProducts, setAllProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalCategory, setModalCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [addedProducts, setAddedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // אחכ לעשות עם שליפה מהרדוסר
    // טעינת כל המוצרים מהשרת
    const loadAllProducts = async () => {
        debugger
        const products = await GetAllProducts();
        setAllProducts(products);
    };

    const handleShowModal = (categoryID) => {
        debugger
        setModalCategory(categoryID);
        loadAllProducts();
        setShowModal(true);
    };

    const handleSelectProduct = (productID) => {
        setSelectedProducts(prev =>
            prev.includes(productID) ? prev.filter(id => id !== productID) : [...prev, productID]
        );
    };
    const handleAddProductsToCategory = async () => {
        const addedProducts = [];
        for (let productID of selectedProducts) {
            await addProductToCategory(modalCategory, productID);
            addedProducts.push(allProducts.find(product => product.productID === productID));
        }
        setAddedProducts(addedProducts);
        setShowModal(false);
        setSelectedProducts([]);
        setShowSuccessModal(true);
        showProducts(modalCategory); // רענון רשימת המוצרים בקטגוריה
    };

    const handleShowDetailsModal = (product) => {
        setCurrentProduct(product);
        setShowDetailsModal(true);
    };
    const nameUp = (upCategory) => {
        const category = data.find(a => a.categoryID === upCategory);
        return category ? category.nameHe : 'אין קטגורית אב';
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>All Categories</h2>
                <Button variant="primary" onClick={() => setShowAddForm(true)}>הוספת קטגוריה</Button>
            </div>
            <ul className="list-group">
                {data.map(category => (
                    <li key={category.categoryID} className="list-group-item">
                        <h5>{category.nameHe} ({category.nameEn})</h5>
                        <p>{category.descriptionHe} ({category.descriptionEn})</p>
                        CategoryID: <bdi>{category.categoryID}</bdi> |
                        Up Category: <bdi>{nameUp(category.upCategory)}</bdi> |
                        Created At: {category.createAt}
                        <p>{category.ImageURL}</p>
                        <div className="mt-3">
                            <button className="btn btn-primary me-2" onClick={() => showProducts(category.categoryID)}>
                                {expandedCategories.includes(category.categoryID) ? 'הסתר מוצרים' : 'הצג מוצרים לקטגוריה'}
                            </button>
                            <button className="btn btn-success me-2" onClick={() => handleShowModal(category.categoryID)}>הוסף מוצר לקטגוריה</button>
                            <button className="btn btn-warning me-2" onClick={() => handleEditCategory(category)}>ערוך קטגוריה</button>
                        </div>
                        <Collapse in={expandedCategories.includes(category.categoryID)}>
                            <div className="mt-3">
                                {products[category.categoryID]?.length > 0 ? (
                                    <Row>
                                        {products[category.categoryID].map(product => (
                                            <Col key={product.productID} md={3}>
                                                <Card className="mb-2">
                                                    <Card.Body>
                                                        <Card.Title>{product.nameHe}</Card.Title>
                                                        <Button variant="info" onClick={() => handleShowDetailsModal(product)}>פרטים נוספים</Button>
                                                        <Button variant="danger" onClick={() => confirmDeleteProduct(category.categoryID, product.productID)}>מחק מוצר</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (<p className="alert-danger">אין מוצרים לקטגוריה</p>)
                                }
                            </div>
                        </Collapse>
                    </li>
                ))}
            </ul>
            <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת קטגוריה חדשה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddCategory}>
                        <Form.Group>
                            <Form.Label>שם </Form.Label>
                            <Form.Control
                                type="text"
                                name="nameHe"
                                placeholder="הכנס שם קטגוריה בעברית"
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור  </Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionHe"
                                placeholder="הכנס תיאור קטגוריה בעברית"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>  שם באנגלית  </Form.Label>
                            <Form.Control
                                type="text"
                                name="nameEn"
                                placeholder="Enter category name in English"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionEn"
                                placeholder="Enter category description in English"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>קטגוריית אב</Form.Label>
                            {categories.map(category => (
                                <Form.Check
                                    name="upCategory"
                                    key={category.categoryID}
                                    type="radio"
                                    value={category.categoryID}
                                    label={category.nameHe}
                                    onChange={handleChange}
                                />
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תמונה</Form.Label>
                            <Form.Control
                                type="file"
                                name="Image"
                                //value={newC.Image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" >הוסף קטגוריה</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>הצלחה!</Modal.Title>
                </Modal.Header>

                {editdCategory && (
                    <Modal.Body>
                        הקטגוריה: {editdCategory} עודכנה בהצלחה!
                    </Modal.Body>
                )}
                {addedCategory && (
                    <Modal.Body>
                        הקטגוריה: {addedCategory} נוספה בהצלחה!
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccess(false)}>סגור</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת מוצרים לקטגוריה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {allProducts.map(product => {
                            const isProductInCategory = products[modalCategory]?.some(p => p.productID === product.productID);
                            return (
                                <ListGroup.Item key={product.productID} style={{ backgroundColor: isProductInCategory ? 'darkgray' : '' }}>
                                    <Form.Check
                                        type="checkbox"
                                        label={product.nameHe}
                                        checked={isProductInCategory || selectedProducts.includes(product.productID)}
                                        onChange={() => handleSelectProduct(product.productID)}
                                        disabled={isProductInCategory}
                                    />
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>ביטול</Button>
                    <Button variant="primary" onClick={handleAddProductsToCategory}>הוסף מוצרים</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ערוך קטגוריה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateCategory}>
                        <Form.Group>
                            <Form.Label>שם בעברית</Form.Label>
                            <Form.Control
                                type="text"
                                name="nameHe"
                                placeholder="הכנס שם קטגוריה בעברית"
                                value={newC.nameHe}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור בעברית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionHe"
                                placeholder="הכנס תיאור קטגוריה בעברית"
                                value={newC.descriptionHe}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>שם באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="nameEn"
                                placeholder="Enter category name in English"
                                value={newC.nameEn}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionEn"
                                placeholder="Enter category description in English"
                                value={newC.descriptionEn}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>קטגוריית אב</Form.Label>
                            <Form.Check
                                name="upCategory"
                                key={newC.upCategory}
                                type="radio"
                                label="ללא קטגוריית אב"
                                value={-1}
                                onChange={handleChange}
                            />
                            {filteredCategories.map(category => (
                                <Form.Check
                                    name="upCategory"
                                    key={category.categoryID}
                                    type="radio"
                                    label={category.nameHe}
                                    checked={newC.upCategory === category.categoryID}
                                    value={category.categoryID}
                                    onChange={handleChange}
                                />
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תמונה</Form.Label>
                            <Form.Control
                                type="file"
                                name="Image"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" >עדכן קטגוריה</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>אישור מחיקה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>האם את בטוחה שאת רוצה להוציא את המוצר מהקטגוריה?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>ביטול</Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>אישור</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>מוצרים נוספו בהצלחה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>המוצרים הבאים נוספו בהצלחה:</p>
                    <ListGroup>
                        {addedProducts.map(product => (
                            <ListGroup.Item key={product.productID}>{product.nameHe}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>אישור</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>פרטים נוספים</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProduct && (
                        <>
                            <p>תיאור: {currentProduct.descriptionHe}</p>
                            <p>מחיר: {currentProduct.price}</p>
                            <p>מחיר במבצע: {currentProduct.salePrice}</p>
                            <p>שם באנגלית: {currentProduct.nameEn}</p>
                            <p>תיאור באנגלית: {currentProduct.descriptionEn}</p>
                            <p>נוצר בתאריך: {currentProduct.createdAt}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>סגור</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};
export default AllCategories;
