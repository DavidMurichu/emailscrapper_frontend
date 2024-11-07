// import React, { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types'; // Import PropTypes
// import { Line } from 'react-chartjs-2';
// import { Chart, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// // Register chart.js components
// Chart.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // AnalysisLineChart component
// const AnalysisLineChart = ({ initialData }) => {
//   const [rawdata, setRawData] = useState(initialData);
//   const [dataset, setDataset] = useState({
//     valid_emails: [],
//     invalid_emails: [],
//     total_emails: [],
//     success_rate: [],
//     total_urls: [],
//     scrapped_urls: [],
//     unscrapped_urls: [],
//   });

//   useEffect(() => {
//     // Append new data to the dataset when rawdata changes
//     setDataset((prevState) => ({
//       valid_emails: [...prevState.valid_emails, rawdata.valid_emails],
//       invalid_emails: [...prevState.invalid_emails, rawdata.invalid_emails],
//       total_emails: [...prevState.total_emails, rawdata.total_emails],
//       success_rate: [...prevState.success_rate, rawdata.success_rate],
//       total_urls: [...prevState.total_urls, rawdata.total_urls],
//       scrapped_urls: [...prevState.scrapped_urls, rawdata.scrapped_urls],
//       unscrapped_urls: [...prevState.unscrapped_urls, rawdata.unscrapped_urls],
//     }));

//     // Update the raw data
//     setRawData(initialData);
//   }, [initialData, rawdata]); // Include rawdata in the dependency array

//   // Prepare the chart data
//   const data = {
//     labels: Array.from({ length: dataset.total_emails.length }, (_, i) => i + 1),
//     datasets: [
//       {
//         label: 'Valid Emails',
//         data: dataset.valid_emails,
//         fill: true,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//       },
//       {
//         label: 'Invalid Emails',
//         data: dataset.invalid_emails,
//         fill: true,
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//       },
//       {
//         label: 'Total Emails',
//         data: dataset.total_emails,
//         fill: true,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//       },
//       {
//         label: 'Success Rate (%)',
//         data: dataset.success_rate,
//         fill: true,
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//       },
//       {
//         label: 'Total URLs',
//         data: dataset.total_urls,
//         fill: true,
//         backgroundColor: 'rgba(255, 206, 86, 0.2)',
//         borderColor: 'rgba(255, 206, 86, 1)',
//       },
//       {
//         label: 'Scrapped URLs',
//         data: dataset.scrapped_urls,
//         fill: true,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//       },
//       {
//         label: 'Unscrapped URLs',
//         data: dataset.unscrapped_urls,
//         fill: true,
//         backgroundColor: 'rgba(255, 159, 64, 0.2)',
//         borderColor: 'rgba(255, 159, 64, 1)',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// // Prop validation
// AnalysisLineChart.propTypes = {
//   initialData: PropTypes.shape({
//     valid_emails: PropTypes.number.isRequired,
//     invalid_emails: PropTypes.number.isRequired,
//     total_emails: PropTypes.number.isRequired,
//     success_rate: PropTypes.number.isRequired,
//     total_urls: PropTypes.number.isRequired,
//     scrapped_urls: PropTypes.number.isRequired,
//     unscrapped_urls: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default AnalysisLineChart;
