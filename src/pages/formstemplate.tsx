import type { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { postData } from 'src/services/ApiService';
import { useNavigate } from 'react-router-dom';

// Define types for field configuration
export type Field = { 
  name: string;
  label: string;
  type: 'text' | 'select' | 'textarea'; // Added 'textarea' type
  options?: { value: string; label: string }[]; 
  required?: boolean;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  fields: Field[];
};

export function AnalyticsForm({ title, subheader, fields, ...other }: Props) {
  const theme = useTheme();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const navigate= useNavigate();

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    const url = 'start';

    try {
      const result = await postData(url, formData);
      if (result.status === 200) {
        console.log('Data posted successfully:', result.data);
        alert('Data submitted successfully!');
        navigate('/')
      } else {
        console.error('Failed to submit data:', result.data.message);
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <form onSubmit={handleSubmit} style={{ padding: theme.spacing(2) }}>
        {fields.map((field) => {
          if (field.type === 'text' || field.type === 'textarea') {
            return (
              <TextField
                key={field.name}
                fullWidth
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChangeTextField}
                margin="normal"
                required={field.required}
                multiline={field.type === 'textarea'} // Enable multiline for textarea
                rows={field.type === 'textarea' ? 4 : 1} // Adjust rows for textarea
              />
            );
          }
          if (field.type === 'select' && field.options) {
            return (
              <FormControl key={field.name} fullWidth margin="normal" required={field.required}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChangeSelect}
                  label={field.label}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          return null; // Fallback for unsupported types
        })}
        <Button variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
