import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month }) => {
  const [priceRanges, setPriceRanges] = useState({});

  const fetchPriceRanges = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/bar-chart', {
      params: { month }
    });
    setPriceRanges(res.data);
  };

  useEffect(() => {
    fetchPriceRanges();
  }, [month]);

  const data = {
    labels: Object.keys(priceRanges),
    datasets: [
      {
        label: 'Number of Items',
        data: Object.values(priceRanges),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <h1>Bar Chart for {month}</h1>
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

export default BarChart;
