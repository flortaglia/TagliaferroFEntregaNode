const CarritoContainer = require('../src/CarritoContainer')
const isNumber = require('is-number');
const cart = new CarritoContainer()


module.exports = { 
    postCarrito, 
    deleteCarrito, 
    verCarrito, 
    insertProductoByIdToCart,
    deleteProductoCarrito
}