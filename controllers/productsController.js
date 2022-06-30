const Contenedor = require('../src/Contenedor')
const isNumber = require('is-number');
const productos = new Contenedor()

const getProductos = (req, res) => {
    const verProductos= productos.getAll()
    
    res.json(productos.getAll())
    // res.render('productos.hbs',{verProductos})
}

const postProductos = (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body 
    const elemento = productos.newProduct(title, description, code, price, thumbnail, timestamp, stock)
    res.json(elemento)
    // res.redirect('/api/productos')
    // res.statusCode=201
}
const getProductoId = (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = productos.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    res.json(elemento)
}
const putProduct = (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = productos.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    productos.update(id,title, description, code, price, thumbnail, timestamp, stock)
    const elementChanged = productos.getById(id)
    res.json(elementChanged)
    
}
const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)|| !id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    productos.deleteById(id)
    res.json(productos.getAll())
}
// const mostrarForm =(req,res)=>{
//     res.render('form.hbs')
// }


module.exports = {
    getProductos,
    postProductos,
    getProductoId,
    putProduct,
    deleteProduct
    // mostrarForm
}
