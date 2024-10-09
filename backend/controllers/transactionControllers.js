const Product = require('../models/transactionModels');
const axios = require('axios');

const initializeDatabase = async (req, res) => {
  try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const data = response.data;

      await Product.deleteMany();
      await Product.insertMany(data);

      res.status(201).json({ message: 'Database initialized successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error initializing database', error });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const { title, description, price, month = "March", page = 1, limit = 10 } = req.query;

    const monthIndex = new Date(`${month} 1`).getMonth() + 1;
    const queryObject = {};

    if (title) queryObject.title = { $regex: title, $options: 'i' };
    if (description) queryObject.description = { $regex: description, $options: 'i' };
    if (price) queryObject.price = price;

    queryObject.$expr = { $eq: [{ $month: "$dateOfSale" }, monthIndex] };

    let result = Product.find(queryObject);
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(Number(limit));

    const products = await result;
    
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
};


const getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthIndex = new Date(`${month} 1`).getMonth();

  const products = await Product.find({
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
});

  const totalSale = products.reduce((acc, product) => acc + product.price, 0);
  const totalSoldItems = products.filter(product => product.sold).length;
  const totalUnsoldItems = products.filter(product => !product.sold).length;

  res.status(200).json({
      totalSale,
      totalSoldItems,
      totalUnsoldItems
  });
};

const getPriceRangeData = async (req, res) => {
  const { month } = req.query;
  const monthIndex = new Date(`${month} 1`).getMonth();
  
  const products = await Product.find({
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
});

  const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
  };

  products.forEach(product => {
      const price = product.price;
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
  });

  res.status(200).json(priceRanges);
};

const getCategoryDistribution = async (req, res) => {
  const { month } = req.query;

  const monthIndex = new Date(`${month} 1`).getMonth();
  
  const products = await Product.find({
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex + 1] }
});

  const categoryDistribution = {};

  products.forEach(product => {
      const category = product.category;
      if (categoryDistribution[category]) {
          categoryDistribution[category]++;
      } else {
          categoryDistribution[category] = 1;
      }
  });

  res.status(200).json(categoryDistribution);
};

module.exports = {
  initializeDatabase,
  getAllTransactions,
  getStatistics,
  getPriceRangeData,
  getCategoryDistribution,
}