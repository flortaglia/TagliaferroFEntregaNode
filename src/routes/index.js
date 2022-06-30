const { Router } = require('express');
const router = Router()
const { getProductos, postProductos, getProductoId, 
            putProduct,deleteProduct} = require('../../controllers/productsController')
const { postCarrito, deleteCarrito, verCarrito, 
    insertProductoByIdToCart, deleteProductoCarrito} = require('../../controllers/cartController')

router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct )

// router.get('/productos', mostrarForm)

router.post('/carrito', postCarrito)
router.delete('/carrito/:id', deleteCarrito )
router.get('/carrito/:id/productos', verCarrito)
router.post('/carrito/:id/productos', insertProductoByIdToCart)
router.delete('/carrito/:id/productos/:id_prod', deleteProductoCarrito)


module.exports = router