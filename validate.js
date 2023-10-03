// Middleware для валідації та приведення типів
const validateAndCast = (req, res, next) => {
    const id = req.params.id;
    const price = req.query.price;
    if (id) {
      req.params.id = parseInt(id);
    }
    if (price) {
      req.query.price = parseFloat(price);
    }
    next();
  };
  
  module.exports = validateAndCast;