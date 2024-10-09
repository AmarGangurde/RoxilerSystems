const express = require('express');
const router = express.Router();

const {
  initializeDatabase,
  getAllTransactions,
  getStatistics,
  getPriceRangeData,
  getCategoryDistribution,
} = require('../controllers/transactionControllers');

router.get('/initialize', initializeDatabase);

router.get('/transactions', getAllTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getPriceRangeData);
router.get('/pie-chart', getCategoryDistribution);

module.exports = router;
