const Contenedor = require('../src/Contenedor')
const isNumber = require('is-number');
const productosContenedor = new Contenedor()
const {escribir}= require ('../persistencia/persistencia')

const getProductos = (req, res) => {
    const verProductos= productosContenedor.getAll()
  
    res.json(verProductos)
    // res.render('productos.hbs',{verProductos})
}

const postProductos = (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body 
    const elemento = productosContenedor.newProduct(title, description, code, price, thumbnail, timestamp, stock)
    escribir('listaProductos',productosContenedor.getAll())
    
    
    res.json(elemento)
    // res.redirect('/api/productos')
    // res.statusCode=201
}
const getProductoId = (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = productosContenedor.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
   
    res.json(elemento)
}
const putProduct = (req, res) => {
    const {title, description, code, price, thumbnail, timestamp, stock} = req.body
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = productosContenedor.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    productosContenedor.update(id,title, description, code, price, thumbnail, timestamp, stock)
    const elementChanged = productosContenedor.getById(id)
    escribir('listaProductos',productosContenedor.getAll())
    res.json(elementChanged)
    
}
const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)|| !id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    productosContenedor.deleteById(id)
    escribir('listaProductos',productosContenedor.getAll())
    res.json(productosContenedor.getAll())
}
// const mostrarForm =(req,res)=>{
//     res.render('form.hbs')
// }


module.exports = {
    getProductos,
    postProductos,
    getProductoId,
    putProduct,
    deleteProduct,
    productosContenedor
    // mostrarForm
}
