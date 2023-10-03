const express = require('express');
const products = require('./products');
const validateAndCast = require('./validate');
const validateProductExists = require('./validateProduct');

const app = express();

// Middleware для парсингу JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({message: "Home"});
});

//Весь список
app.get('/products', (req, res) => {
    const productsPriceList = products.map(products => {
        const {id, name, price} = products
        return {id, name, price}
    })
    res. status(200).json(productsPriceList);
});

// Возвращает товар по id
app.get('/products/:id', validateAndCast, validateProductExists, (req, res) =>{
    const { id } = req.params;
    const product = products.find((product) => {
        return product.id === Number(id);
    });
    if(!product) {
        res.status(404).send("Not found");
    }
    res.status(200).json(product);
});

// Фильтрует товари по названию и цене
app.get('/search', validateAndCast, (req, res) =>{
    const { name, price } = req.query;
    let newProduct = [...products];
    if (name) {
        newProduct = newProduct.filter((product) => {
            return product.name === name;
        });
    };
    if (price) {
        newProduct = newProduct.filter((product) => {
            return product.price >= Number(price);
        });
    };
    res.status(200).json(newProduct);
});

// Запуск серверу
app.listen(8000);

