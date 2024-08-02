import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; // השתמש באייקון המתאים
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import HighlightIcon from '@mui/icons-material/Highlight';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './AccessibilityButton.css';
import { useTranslation } from'react-i18next';

const AccessibilityButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isReading, setIsReading] = useState(false);
    const [isInverted, setIsInverted] = useState(false);
    const [isTextEnlarged, setIsTextEnlarged] = useState(false);
    const [synth] = useState(window.speechSynthesis);
    const [utterThis, setUtterThis] = useState(null);
    const { t, i18n } = useTranslation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccessibilityOption = (option) => {
        switch (option) {
            case 'textReader':
                readText();
                break;
            case 'invertColors':
                toggleInvertColors();
                break;
            case 'enlargeText':
                toggleEnlargeText();
                break;
            case 'highlightHeadlines':
                highlightHeadlines();
                break;
            case 'resetAccessibility':
                resetAccessibility();
                break;
            default:
                break;
        }
        handleClose();
    };

    const readText = () => {
        if ('speechSynthesis' in window) {
            const text = document.body.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => {
                setIsReading(false);
            };
            setUtterThis(utterance);
            synth.speak(utterance);
            setIsReading(true);
        } else {
            alert('הדפדפן שלך אינו תומך בקורא טקסטים');
        }
    };

    const stopReading = () => {
        synth.cancel();
        setIsReading(false);
    };

    const toggleInvertColors = () => {
        if (isInverted) {
            document.body.classList.remove('invert-colors');
        } else {
            document.body.classList.add('invert-colors');
        }
        setIsInverted(!isInverted);
    };

    const toggleEnlargeText = () => {
        if (isTextEnlarged) {
            document.body.classList.remove('enlarge-text');
        } else {
            document.body.classList.add('enlarge-text');
        }
        setIsTextEnlarged(!isTextEnlarged);
    };

    const resetAccessibility = () => {
        document.body.classList.remove('invert-colors');
        document.body.classList.remove('enlarge-text');
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((headline) => {
            headline.style.backgroundColor = 'transparent';
        });
        setIsInverted(false);
        setIsTextEnlarged(false);
        stopReading();
    };

    const highlightHeadlines = () => {
        const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headlines.forEach((headline) => {
            headline.style.backgroundColor = 'yellow';
        });
    };

    return (
        <div className="accessibility-button">
            {isReading && (
                <IconButton
                    className="reading-icon"
                    onClick={stopReading}
                    color="primary"
                >
                    <VolumeUpIcon />
                </IconButton>
            )}
            <Button
                className="accessibility-button"
                aria-controls="accessibility-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
                color="primary"
            >
                <AccessibleForwardIcon />
            </Button>
            <Menu
                id="accessibility-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleAccessibilityOption('textReader')}>
                    <VisibilityIcon /> {t('accessibilityButtonPage.textReader')}
                </MenuItem>
                <MenuItem onClick={() => handleAccessibilityOption('highlightHeadlines')}>
                    <HighlightIcon />  {t('accessibilityButtonPage.highlightTitles')}
                </MenuItem>
                <MenuItem onClick={() => handleAccessibilityOption('enlargeText')}>
                    <FormatSizeIcon />  {t('accessibilityButtonPage.textEnlarger')}
                </MenuItem>
                <MenuItem onClick={() => handleAccessibilityOption('invertColors')}>
                    <InvertColorsIcon />  {t('accessibilityButtonPage.colorReversal')}
                </MenuItem>
                <MenuItem onClick={() => handleAccessibilityOption('resetAccessibility')}>
                    <CloseIcon />  {t('accessibilityButtonPage.resetAccessibility')}
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AccessibilityButton;
