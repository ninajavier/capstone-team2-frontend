import React, { useState } from 'react';
import { Translate } from '@google-cloud/translate';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';

const TranslationModal = ({ isOpen, onClose }) => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language

  const handleTranslate = async () => {
    // Use the @google-cloud/translate library to translate text
    // Set the translated text in the state
  };

  return (
    <div className={`translation-modal ${isOpen ? 'open' : ''}`}>
      <Button onClick={onClose} variant="outlined" color="primary">
        Close
      </Button>
      <TextareaAutosize
        value={textToTranslate}
        onChange={(e) => setTextToTranslate(e.target.value)}
        minRows={3}
        placeholder="Enter text to translate"
      />
      <Select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        variant="outlined"
      >
        <MenuItem value="en">English</MenuItem>
        {/* Add more language options */}
      </Select>
      <Button
        onClick={handleTranslate}
        variant="contained"
        color="primary"
        startIcon={<TranslateIcon />}
      >
        Translate
      </Button>
      <div className="translated-text">{translatedText}</div>
    </div>
  );
};

export default TranslationModal;
