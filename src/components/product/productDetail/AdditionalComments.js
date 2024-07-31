import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AdditionalComments = ({ initialValue, setAdditionalComments }) => {
    const [comments, setComments] = useState(initialValue || '');
    const { t ,i18n} = useTranslation();

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
            <Typography variant="h6">{t('additionalCommentsPage.addComment')}</Typography>
            <TextField
                label={t('additionalCommentsPage.comments')}
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