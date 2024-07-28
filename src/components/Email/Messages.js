// // import { useTranslation } from 'react-i18next';
// // import { Card, Container, Row, Col, Badge, Form, Button } from 'react-bootstrap';
// // // import { Link, useNavigate } from 'react-router-dom';
// // import { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getMessage } from '../../axios/EmailAxios';
// // import { setMessagesList } from '../../redux/DataActions/DataAction.Message';

// // export const Message = () => {
// //     const { t, i18n } = useTranslation();
// //     const productsList = useSelector(s => s.DataReducer_Message.MessagesList || []);
// //     const [products, setProducts] = useState(productsList);
// //     const [error, setError] = useState(false);
// //     const myDispatch = useDispatch();

// //     // const navigate = useNavigate();
// //     // async function fetchMessages() {
// //     //     try {
// //     //         if (!productsList || productsList.length === 0) {
// //     //             var response = await getMessage();
// //     //             if (!response) {
// //     //                 setProducts([]);
// //     //             }
// //     //             else {
// //     //                 setProducts(response);
// //     //                 myDispatch(setMessagesList(response));
// //     //             }
// //     //         } else {
// //     //             setProducts(productsList);
// //     //         }
// //     //     } catch (error) {
// //     //         setError(true);
// //     //     }
// //     // }
// //     const [selectedMessageId, setSelectedMessageId] = useState(null);
// //     const handleButtonClick = (id) => {
// //         setSelectedMessageId(id);
// //     };
    
// //     async function fetchMessages() {
// //         try {
// //             if (!productsList || productsList.length === 0) {
// //                 var response = await getMessage();
// //                 if (!response) {
// //                     setProducts([]);
// //                 } else {
// //                     setProducts(response);
// //                     myDispatch(setMessagesList(response));
// //                 }
// //             } else {
// //                 setProducts(productsList);
// //             }
// //         } catch (error) {
// //             setError(true);
// //         }
// //     }    
// //     useEffect(() => {
// //         fetchMessages();
// //     }, [productsList]);
    
// //     return (
// //         <Container>
// //             {error ? (
// //                 <p>There was an error fetching the products.</p>
// //             ) : (
// //                 <Row>
// //                     {products.map(product => (
// //                         <Col key={product.id} sm={12} md={6} lg={4}>
// //                             <button className="mb-4">
// //                                 <Card.Body>
// //                                 <Card.Title>{product.name}</Card.Title>
// //                                 <Card.Title>{product.email}</Card.Title>
// //                                 <Card.Title>{product.message}</Card.Title>
                           
// //                                 </Card.Body>
// //                             </button>
// //                         </Col>
// //                     ))}
// //                 </Row>
// //             )}
// //         </Container>
// //     );
// // };


// import { useTranslation } from 'react-i18next';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMessage } from '../../axios/EmailAxios';
// import { setMessagesList } from '../../redux/DataActions/DataAction.Message';

// export const Message = () => {
//     const { t, i18n } = useTranslation();
//     const messagesList = useSelector(s => s.DataReducer_Message.MessagesList || []);
//     const [messages, setMessages] = useState(messagesList);
//     const [selectedMessageId, setSelectedMessageId] = useState(null);
//     const [error, setError] = useState(false);
//     const myDispatch = useDispatch();

//     async function fetchMessages() {
//         try {
//             if (!messagesList || messagesList.length === 0) {
//                 var response = await getMessage();
//                 if (!response) {
//                     setMessages([]);
//                 } else {
//                     setMessages(response);
//                     myDispatch(setMessagesList(response));
//                 }
//             } else {
//                 setMessages(messagesList);
//             }
//         } catch (error) {
//             setError(true);
//         }
//     }    

//     useEffect(() => {
//         fetchMessages();
//     }, [messagesList]);

//     const handleButtonClick = (id) => {
//         setSelectedMessageId(id);
//     };

//     const selectedMessage = messages.find(message => message.messageId=== selectedMessageId);

//     return (
//         <Container>
//             {error ? (
//                 <p>There was an error fetching the products.</p>
//             ) : selectedMessage ? (
//                 <Card>
//                     <Card.Body>
//                         <Card.Title>{selectedMessage.name}</Card.Title>
//                         <Card.Subtitle>{selectedMessage.email}</Card.Subtitle>
//                         <Card.Text>{selectedMessage.message}</Card.Text>
//                         <Button onClick={() => setSelectedMessageId(null)}>Back</Button>
//                     </Card.Body>
//                 </Card>
//             ) : (
//                 <Row>
//                     {messages.map(message => (
//                         <Col key={message.messageId} sm={12} md={6} lg={4}>
//                             <Button className="mb-4" onClick={() => handleButtonClick(message.messageId)}>
//                                 <Card.Body>
//                                     <Card.Title>{message.name}</Card.Title>
//                                     <Card.Subtitle>{message.email}</Card.Subtitle>
//                                     <Card.Text>{message.message}</Card.Text>
//                                 </Card.Body>
//                             </Button>
//                         </Col>
//                     ))}
//                 </Row>
//             )}
//         </Container>
//     );
// };


import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../../axios/EmailAxios';
import { setMessagesList } from '../../redux/DataActions/DataAction.Message';

export const Message = () => {
    const { t, i18n } = useTranslation();
    const messagesList = useSelector(s => s.DataReducer_Message.MessagesList || []);
    const [messages, setMessages] = useState(messagesList);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [error, setError] = useState(false);
    const myDispatch = useDispatch();

    async function fetchMessages() {
        try {
            if (!messagesList || messagesList.length === 0) {
                var response = await getMessage();
                if (!response) {
                    setMessages([]);
                } else {
                    setMessages(response);
                    myDispatch(setMessagesList(response));
                }
            } else {
                setMessages(messagesList);
            }
        } catch (error) {
            setError(true);
        }
    }    

    useEffect(() => {
        fetchMessages();
    }, [messagesList]);

    const handleButtonClick = (id) => {
        setSelectedMessageId(id);
    };

    const selectedMessage = messages.find(message => message.messageId === selectedMessageId);

    return (
        <Container>
            {error ? (
                <p>There was an error fetching the messages.</p>
            ) : selectedMessage ? (
                <Card className="text-white bg-dark mb-3">
                    <Card.Body>
                        <Card.Title>{selectedMessage.name}</Card.Title>
                        <Card.Subtitle>{selectedMessage.email}</Card.Subtitle>
                        <Card.Text>{selectedMessage.message}</Card.Text>
                        <Button variant="light" onClick={() => setSelectedMessageId(null)}>חזרה</Button>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {messages.map(message => (
                        <Col key={message.messageId} sm={12} md={6} lg={4}>
                            <Button className="mb-4 text-white bg-dark w-100" onClick={() => handleButtonClick(message.messageId)}>
                                <Card.Body>
                                    <Card.Title>{message.name}</Card.Title>
                                    <Card.Subtitle>{message.email}</Card.Subtitle>
                                    <Card.Text>{message.message}</Card.Text>
                                </Card.Body>
                            </Button>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

