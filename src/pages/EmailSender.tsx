import React, { useState } from 'react';
import { CardProps } from '@mui/material/Card';
import { Card, CardHeader, Snackbar, Alert } from '@mui/material';
import { postData } from 'src/services/ApiService';
import { AnalyticsForm, Field } from './formstemplate';

const EmailSender: React.FC<CardProps> = (props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const fields: Field[] = [
   
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const result = await postData('your-email-api-endpoint', formData); // Replace with your API
      if (result.status === 200) {
        setSnackbarMessage('Email sent successfully!');
        setSnackbarSeverity('success');
      } else {
        throw new Error(result.data.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSnackbarMessage('Failed to send email. Please try again.');
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
   
      <>
      <AnalyticsForm fields={fields} title="Emails Sender" subheader="" />
      
      </>
  
  );
};

export default EmailSender;
