  // useEffect(() => {
  //   const fetchUpdates = () => {
  //     const socket = new WebSocket('ws://127.0.0.1:8001/ws/emails/');
  //     socket.onopen = () => {
  //       console.log('WebSocket connection established');
  //       socket.send(JSON.stringify({ message: "Hello Server!" }));
  //     };

  //     socket.onmessage = (event) => {
  //       const socket_data = JSON.parse(event.data);
  //       console.log('socket data', socket_data);
  //       setData(socket_data);
  //     };

  //     socket.onclose = (event) => {
  //       console.log('WebSocket connection closed', event);
  //     };

  //     socket.onerror = (error) => {
  //       console.error('WebSocket error observed:', error);
  //     };

  //     return () => {
  //       console.log('Cleaning up WebSocket connection');
  //       socket.close();
  //     };
  //   };

  //   let cleanup = fetchUpdates();

  //   const intervalId = setInterval(() => {
  //     cleanup();
  //     cleanup = fetchUpdates();
  //   }, 30000);

  //   return () => {
  //     clearInterval(intervalId);
  //     cleanup();
  //   };
  // }, []);
  const data = {
    labels: Array.from({ length: 100 }, (_, i) => new Date(2023, 0, 1, 0, i)), // Creates dates in minute intervals
    datasets: [
      {
        label: 'Invalid Emails',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Valid Emails',
        data: Array.from({ length: 100 }, (_, i) => i + 30),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Total Emails',
        data: Array.from({ length: 100 }, (_, i) => i + 25),
        fill: true,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
      },
      {
        label: 'Unscrapped URLs',
        data: Array.from({ length: 100 }, (_, i) => i + 20),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Scrapped URLs',
        data: Array.from({ length: 100 }, (_, i) => i + 15),
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Total Links In Database',
        data: Array.from({ length: 100 }, (_, i) => i + 10),
        fill: true,
        backgroundColor: 'rgba(70, 130, 180, 0.2)',
        borderColor: 'rgba(70, 130, 180, 1)',
      },
      {
        label: 'Success Rate',
        data: Array.from({ length: 100 }, (_, i) => i + 5),
        fill: true,
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
      },
    ],
  };