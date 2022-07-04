const CarritoContainer = require('../src/CarritoContainer')
const Contenedor = require('../src/Contenedor')
const isNumber = require('is-number');
const { productosContenedor } = require('./productsController')
const {escribir}= require ('../persistencia/persistencia')
 
const carts = new CarritoContainer()

const postCarrito = (req, res)=>{
    // const {timestamp} = req.body //ver preguntar
    const elemento = carts.newCart()
    escribir('listaCarritos',carts.getAllCarts())
    res.json(elemento)
}

const verCarrito = (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = carts.getCartById(id)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    res.json(elemento)
}
const deleteCarrito = (req, res) => {
    const id = Number(req.params.id)
    const elemento = carts.getCartById(id)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    carts.deleteCartById(id)
    escribir('listaCarritos',carts.getAllCarts())
    res.json(carts.getAllCarts())
}

const insertProductoByIdToCart = (req,res)=>{
    const id_cart=Number(req.params.id)
    const {id} = req.body 
    console.log("imprimo id_cart",id_cart)
    // const id_prod= Number(req.body.id)
    const elemento = carts.getCartById(id_cart)
    if(!elemento.length){return res.status(404).json({error: "Carrito no encontrado"})}
    
    console.log("imprimo id_prod",id)
    const productInsert= productosContenedor.getById(id)
    const item=productInsert[0]
    console.log("imprimo prod",item) 
    if(!isNumber(id_cart)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    if(!isNumber(id)|| productInsert.length==0){return res.json({ error: "El producto no existe" })}
    escribir('listaCarritos',carts.getAllCarts())
    res.json(carts.insertProductById(id_cart,item))
    


}
const deleteProductoCarrito = (req, res)=>{
    const id=Number(req.params.id)
    const id_prod= Number(req.params.id_prod)
    const productdelete= productosContenedor.getById(id_prod)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    if(!isNumber(id_prod)|| productdelete.length==0){return res.json({ error: "El producto no existe" })}
    escribir('listaCarritos',carts.getAllCarts())
     res.json(carts.deleteProductofCartById(id,id_prod))
    
}

module.exports = { 
    postCarrito, 
    deleteCarrito, 
    verCarrito, 
    insertProductoByIdToCart,
    deleteProductoCarrito
}