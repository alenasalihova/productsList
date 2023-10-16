const products = require('./products');

const getHome = (req, res) => {
    res.status(200).send({ message: "Home" });
};

const getProducts = (req, res) => {
    const { name, price } = req.query;
    let filteredProducts = [...products];

    if (name) {
        filteredProducts = filteredProducts.filter(product => product.name === name);
    }

    if (price) {
        filteredProducts = filteredProducts.filter(product => product.price >= price);
    }

    res.status(200).json(filteredProducts);
};

const getProductById = (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);
    if (!product) {
        res.status(404).send("Not found");
    }
    res.status(200).json(product);
};

const createProduct = (req, res) => {
    const { id, name, price } = req.body;
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = { id, name, price };
    res.status(200).json(products[productIndex]);
};

const updatePartialProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = products.findIndex(product => product.id === id);
    if (name) {
        products[productIndex].name = name;
    }
    if (price) {
        products[productIndex].price = price;
    }
    res.status(200).json(products[productIndex]);
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);
    const deletedProduct = products.splice(productIndex, 1);
    res.status(200).json(deletedProduct);
};

module.exports = {
    getHome,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updatePartialProduct,
    deleteProduct
};