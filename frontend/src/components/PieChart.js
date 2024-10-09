import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ month }) => {
  const [categories, setCategories] = useState({});

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/pie-chart', {
      params: { month }
    });
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, [month]);

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Category Distribution',
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }
    ]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '600px', height: '400px',paddingLeft:'800px', marginTop:'-420px' }}>
      <h1>Pie Chart for {month}</h1>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};

export default PieChart;
