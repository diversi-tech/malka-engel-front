import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

export const PayForm = () => {
    return (
        <Container sx={{ mt: 5, maxWidth: '500px' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    פרטי אשראי
                </Typography>
                <form>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="מספר כרטיס אשראי"
                            variant="outlined"
                            id="cardNumber"
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="תאריך תפוגה"
                            variant="outlined"
                            id="expiryDate"
                            placeholder="MM/YY"
                        />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="CVV"
                            variant="outlined"
                            id="cvv"
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        שלח
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
