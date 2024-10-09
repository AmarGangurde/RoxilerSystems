import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Statistics.css';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  const fetchStatistics = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/statistics', {
      params: { month }
    });
    setStatistics(res.data);
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div className="container">
      <h1>Statistics for {month}</h1>
      <div className="stats">
        <p>Total Sale: <strong>${statistics.totalSale}</strong></p>
        <p>Total Sold Items: <strong>{statistics.totalSoldItems}</strong></p>
        <p>Total Unsold Items: <strong>{statistics.totalUnsoldItems}</strong></p>
      </div>
    </div>
  );
};

export default Statistics;
