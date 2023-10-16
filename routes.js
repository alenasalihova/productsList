const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get("/", controllers.getHome);
router.get('/products', controllers.getProducts);
router.get('/products/:id', controllers.getProductById);
router.post('/products', controllers.createProduct);
router.put('/products/:id', controllers.updateProduct);
router.patch('/products/:id', controllers.updatePartialProduct);
router.delete('/products/:id', controllers.deleteProduct);

module.exports = router;