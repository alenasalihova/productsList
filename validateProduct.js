const products = require('./products');
// Middleware для перевірки чи існує товар з вказаним id
const validateProductExists = (req, res, next) => {
  const id = req.params.id;
  const product = products.find(product => product.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = validateProductExists;