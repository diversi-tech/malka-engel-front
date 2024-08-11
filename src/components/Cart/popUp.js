import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PopUp = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate("/myHome");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="order-complete-dialog"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="order-complete-dialog">
                {t('popUpPage.modalTitle')}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    {t('popUpPage.thankYouMessage')}
                </Typography>
                <Typography variant="body1">
                    {t('popUpPage.orderCompleteDescription')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    {t('popUpPage.closeButton')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
