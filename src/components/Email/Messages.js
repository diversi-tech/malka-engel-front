/*import { useTranslation } from 'react-i18next';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, deleteMessage } from '../../axios/EmailAxios';
import { setMessagesList } from '../../redux/DataActions/DataAction.Message';
import { SeEmails} from '../Email/SeEmails';

export const Message = () => {
    const { t, i18n } = useTranslation();
    const messagesList = useSelector(s => s.DataReducer_Message.MessagesList || []);
    const [messages, setMessages] = useState(messagesList);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [error, setError] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailData, setEmailData] = useState(null);
    const myDispatch = useDispatch();

const fetchMessages = async () => {
    try {
      if (!messagesList || messagesList.length === 0) {
        const response = await getMessage();
        setMessages(response || []);
        myDispatch(setMessagesList(response || []));
      } else {
        setMessages(messagesList);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [messagesList]);

  const handleButtonClick = (id) => {
    setSelectedMessageId(id);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setSelectedMessageId(null);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert(`Error deleting message: ${error.message}`);
    }
  };

  const handleSendEmail = (message) => {
    setEmailData({ ToAddress: message.email, Greeting: `היי ${message.name},` });
    setShowEmailModal(true);
  };

  const selectedMessage = messages.find((message) => message.messageId === selectedMessageId);

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
            <Button variant="danger" onClick={() => handleDeleteMessage(selectedMessage.messageId)}>מחק</Button>
            <Button variant="primary" onClick={() => handleSendEmail(selectedMessage)}>שלח מייל</Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {messages.map((message) => (
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
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>שלח מייל</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeEmails emailData={emailData} />
        </Modal.Body>
      </Modal>
    </Container>
  );


}*/
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, deleteMessage } from '../../axios/EmailAxios';
import { setMessagesList } from '../../redux/DataActions/DataAction.Message';
import { SeEmails } from '../Email/SeEmails';
import {
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const Message = () => {
  const { t, i18n } = useTranslation();
  const messagesList = useSelector(s => s.DataReducer_Message.MessagesList || []);
  const [messages, setMessages] = useState(messagesList);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [error, setError] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const myDispatch = useDispatch();

  const fetchMessages = async () => {
    try {
      if (!messagesList || messagesList.length === 0) {
        const response = await getMessage();
        setMessages(response || []);
        myDispatch(setMessagesList(response || []));
      } else {
        setMessages(messagesList);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [messagesList]);

  const handleButtonClick = (id) => {
    setSelectedMessageId(id);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setSelectedMessageId(null);
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert(`Error deleting message: ${error.message}`);
    }
  };

  const handleSendEmail = (message) => {
    setEmailData({ ToAddress: message.email, Greeting: `היי ${message.name},` });
    setShowEmailModal(true);
  };

  const selectedMessage = messages.find((message) => message.messageId === selectedMessageId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {/* Your Nav Title */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, mt: 1 }}>
        {error ? (
          <Typography variant="body1" color="error">
            There was an error fetching the messages.
          </Typography>
        ) : selectedMessage ? (
          <Card sx={{ mb: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">{selectedMessage.email}</Typography>
                <Typography variant="h6">{selectedMessage.name}</Typography>
              </Box>
              <Typography variant="body1" align="center">
                {selectedMessage.message}
              </Typography>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="outlined" onClick={() => setSelectedMessageId(null)}>חזרה</Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteMessage(selectedMessage.messageId)}>מחק</Button>
                <Button variant="contained" color="primary" onClick={() => handleSendEmail(selectedMessage)}>שלח מייל</Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {messages.map((message) => (
              <Grid item xs={12} sm={6} md={4} key={message.messageId}>
                <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1">{message.email}</Typography>
                      <Typography variant="h6">{message.name}</Typography>
                    </Box>
                    <Typography variant="body1" align="center">
                      {message.message}
                    </Typography>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => handleButtonClick(message.messageId)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Dialog open={showEmailModal} onClose={() => setShowEmailModal(false)} fullWidth maxWidth="sm">
          <AppBar sx={{ position: 'relative', backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flex: 1 }}>
                שלח מייל
              </Typography>
              <IconButton edge="start" color="inherit" onClick={() => setShowEmailModal(false)} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <SeEmails emailData={emailData} />
          </DialogContent>
        </Dialog>
      </Container>
      <footer>
        {/* Your footer content */}
      </footer>
    </Box>
  );
};