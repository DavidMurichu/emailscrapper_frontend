import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, Typography } from '@mui/material';

interface ProgressData {
  timestamp: number;
  total_emails_count: number;
  valid_emails_count: number;
  invalid_emails_count: number;
  success_rate: number; // New field
  total_url_in_db: number; // New field
  scrapped_urls: number; // New field
  unscrapped_urls: number; // New field
}
const initialProgressData: ProgressData = {
  timestamp: 0,
  total_emails_count: 0,
  valid_emails_count: 0,
  invalid_emails_count: 0,
  success_rate: 0,
  total_url_in_db: 0,
  scrapped_urls: 0,
  unscrapped_urls: 0,
};
interface ProgressGraphProps {
  newData: ProgressData;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({ newData }) => {
  const [emailDataHistory, setEmailDataHistory] = useState<ProgressData[]>([]);
  const [urlDataHistory, setUrlDataHistory] = useState<ProgressData[]>([]);
  const [lastData, setLastData] = useState<ProgressData | null>(null);
  const [lastDiff, setLastDiff] = useState<ProgressData>(initialProgressData);
  const [start,setStart]=useState(false);

  useEffect(() => {
    console.log('New Data:', newData);
    if (!lastData || 
        (lastData.total_emails_count === 0 && 
         lastData.valid_emails_count === 0 && 
         lastData.invalid_emails_count === 0 && 
         lastData.success_rate === 0 &&
         lastData.total_url_in_db === 0 &&
         lastData.scrapped_urls === 0 &&
         lastData.unscrapped_urls === 0)) {
      setLastData(newData); 
      return; 
    }

    const currentDiff: ProgressData = {
      timestamp: newData.timestamp,
      total_emails_count: newData.total_emails_count - lastData.total_emails_count,
      valid_emails_count: newData.valid_emails_count - lastData.valid_emails_count,
      invalid_emails_count: newData.invalid_emails_count - lastData.invalid_emails_count,
      success_rate: newData.success_rate - lastData.success_rate,
      total_url_in_db: newData.total_url_in_db - lastData.total_url_in_db,
      scrapped_urls: newData.scrapped_urls - lastData.scrapped_urls,
      unscrapped_urls: newData.unscrapped_urls - lastData.unscrapped_urls,
    };

    
    const newDiff: ProgressData = {
      timestamp: currentDiff.timestamp,
      total_emails_count: lastDiff.total_emails_count + currentDiff.total_emails_count,
      valid_emails_count: lastDiff.valid_emails_count + currentDiff.valid_emails_count,
      invalid_emails_count: lastDiff.invalid_emails_count + currentDiff.invalid_emails_count,
      success_rate: lastDiff.success_rate + currentDiff.success_rate,
      total_url_in_db: lastDiff.total_url_in_db + currentDiff.total_url_in_db,
      scrapped_urls: lastDiff.scrapped_urls + currentDiff.scrapped_urls,
      unscrapped_urls: lastDiff.unscrapped_urls + currentDiff.unscrapped_urls,
    };

    setEmailDataHistory((prevData) => {
      const updatedEmailData = [...prevData, currentDiff];
      setLastDiff(newDiff);
      setLastData(newData);
      return updatedEmailData.slice(-20);
    });

    setUrlDataHistory((prevData) => {
      const updatedUrlData = [...prevData, currentDiff];
      return updatedUrlData.slice(-20);
    });
  }, [newData,lastData,lastDiff]);

  const successRateData = [
    { name: 'Successful Emails', value: newData.valid_emails_count },
    { name: 'Failed Emails', value: newData.invalid_emails_count },
  ];

  const COLORS = ['#82ca9d', '#ff7300'];

  return (
    <Box sx={{ width: '100%', padding: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Email Progress Changes Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={emailDataHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(time) => new Date(time).toLocaleString()} 
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_emails_count" stroke="#8884d8" strokeWidth={2} name="Total Emails" />
          <Line type="monotone" dataKey="valid_emails_count" stroke="#82ca9d" strokeWidth={2} name="Valid Emails" />
          <Line type="monotone" dataKey="invalid_emails_count" stroke="#ffc658" strokeWidth={2} name="Invalid Emails" />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>URL Progress Changes Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={urlDataHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(time) => new Date(time).toLocaleString()} 
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_url_in_db" stroke="#ff0000" strokeWidth={2} name="Total URLs in DB" />
          <Line type="monotone" dataKey="scrapped_urls" stroke="#00ff00" strokeWidth={2} name="Scrapped URLs" />
          <Line type="monotone" dataKey="unscrapped_urls" stroke="#0000ff" strokeWidth={2} name="Unscrapped URLs" />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>Success Rate Overview</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={successRateData}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`} 
          >
            {successRateData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProgressGraph;
