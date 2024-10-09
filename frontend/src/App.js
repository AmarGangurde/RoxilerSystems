import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Transactions from './components/Transactions';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
  const [month, setMonth] = useState('March'); 

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <Router>
      <div>
        <h1>Dashboard</h1>
        <select onChange={(e) => handleMonthChange(e.target.value)} value={month}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <div>
          <Transactions month={month} />
          <Statistics month={month} />
          <BarChart month={month} />
          <PieChart month={month} />
        </div>
      </div>
    </Router>
  );
}

export default App;
