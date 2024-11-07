import { useState, useEffect } from 'react';
import { BASE_URL, fetchData } from 'src/services/ApiService';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ProgressGraph from 'src/pages/ProgressGraph';
import { DashboardContent } from 'src/layouts/dashboard';


import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';

// Define the type for the data
interface DataType {
  total_emails_count: number;
  valid_emails_count: number;
  invalid_emails_count: number;
  success_rate: number; // New field
  total_url_in_db: number; // New field
  scrapped_urls: number; // New field
  unscrapped_urls: number; // New field
  timestamp: number; // Timestamp for graph
}

export function OverviewAnalyticsView() {
  const [data, setData] = useState<DataType>({
    total_emails_count: 0,
    valid_emails_count: 0,
    invalid_emails_count: 0,
    success_rate: 0,           // Added success_rate
    total_url_in_db: 0,        // Added total_url_in_db
    scrapped_urls: 0,          // Added scrapped_urls
    unscrapped_urls: 0,        // Added unscrapped_urls
    timestamp: Date.now(),      // Timestamp for graph
  });
  

  const get_backend_data = async () => {
    const response = await fetchData('emails');
    if (response.status === 200) {
      const newData = { ...response.data, timestamp: Date.now() };
      console.log(newData)
      setData((prevData) => (JSON.stringify(newData) !== JSON.stringify(prevData) ? newData : prevData));
    }
  };

  useEffect(() => {
    get_backend_data();
    const interval = setInterval(get_backend_data, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async (item: { value: string }) => {
    const endpoint = item.value.toLowerCase();

    try {
      const response = await fetch(`${BASE_URL}/download/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'valid_emails.xlsx'); // Set the name for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Download failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while downloading the file:', error);
    }
  };
  const handleClick = async (item: { value: string }) => {
    const endpoint = item.value.toLowerCase();
    try {

      const response = await fetchData(endpoint);
      console.log("download", response);
      if (response.status === 200) alert('success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardContent maxWidth="xl">
    <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
      Hi, Welcome back 👋
    </Typography>

    <Grid container spacing={3}>
      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Total Emails"
          percent={2.6}
          total={data.total_emails_count}
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [22, 8, 35, 50, 82, 84, 77, 12],
          }}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Valid Emails"
          percent={-0.1}
          total={data.valid_emails_count}
          color="secondary"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 47, 40, 62, 73, 30, 23, 54],
          }}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Invalid Emails"
          percent={3.6}
          total={data.invalid_emails_count}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 30, 23, 54, 47, 40, 62, 73],
          }}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Web Pages In Database"
          percent={2.8}
          total={data.total_url_in_db}
          color="warning"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [40, 70, 50, 28, 70, 75, 7, 64],
          }}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Success Rate"
          percent={3.6}
          total={data.success_rate}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 30, 23, 54, 47, 40, 62, 73],
          }}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Scrapped Urls"
          percent={3.6}
          total={data.scrapped_urls}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 30, 23, 54, 47, 40, 62, 73],
          }}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Unscrapped Urls"
          percent={3.6}
          total={data.unscrapped_urls}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
          chart={{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            series: [56, 30, 23, 54, 47, 40, 62, 73],
          }}
        />
      </Grid>

      {/* Full-width graph row */}
      <Grid xs={12}>
        <ProgressGraph newData={data} />
        {/* <EmailProgressGraph responseData={data} isIdle={isIdle} /> */}
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <AnalyticsTrafficBySite
          onclick={handleDownload}
          title="Actions"
          list={[
            { value: 'Download', label: 'Excel Sheet', total: 323234 }
           
          ]}
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <AnalyticsTrafficBySite
          onclick={handleClick}
          title="Control"
          list={[
            { value: 'Start', label: 'Scrapping', total: 323234 },
            { value: 'Stop', label: 'Scrapping', total: 341212 },
          ]}
        />
      </Grid>
    </Grid>
  </DashboardContent>
  );
}
