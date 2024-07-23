import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const AdditionalComments = ({ initialValue, setAdditionalComments }) => {
    const [comments, setComments] = useState(initialValue || '');

    useEffect(() => {
        setComments(initialValue || '');
    }, [initialValue]);

    const handleCommentsChange = (event) => {
        const value = event.target.value;
        setComments(value);
        setAdditionalComments(value); // Pass content to parent
    };

    return (
        <Box>
            <Typography variant="h6">הוסף הערות נוספות למעצב</Typography>
            <TextField
                label="הערות"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={comments}
                onChange={handleCommentsChange}
                sx={{ mt: 2 }}
            />
        </Box>
    );
};