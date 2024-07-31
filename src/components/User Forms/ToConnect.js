import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ToConnect = () => {
    const navigate = useNavigate();
    const handleClose = () => { navigate(-1); };
    const handleShowLogin = () => { navigate('/myLogin'); };
    const handleShowLogin2 = () => { navigate(-1); };
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);

    const themeColors = {
        primary: '#6a1b9a', // Example purple
        secondary: '#008080', // Example teal
        background: '#f5f5f5', // Light grey
        textPrimary: '#000000', // Black
        textSecondary: '#696969', // Dark grey
    };

    return (
        <div>
            <Dialog open={!connected} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6" color="primary">
                        אתם לא מחוברים
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary">
                        כדי להמשיך, בבקשה ללכת ל-
                        <Button color="secondary" onClick={handleShowLogin}>
                            התחברות
                        </Button>
                        .
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={connected} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6" color="primary">
                        אתם מחוברים
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary">
                        שנמשיך
                        <Button color="secondary" onClick={handleShowLogin2}>
                            continue
                        </Button>
                        .
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        סגור
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
