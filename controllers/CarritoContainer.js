class CarritoContainer{
    constructor(){
        this.carts= [];
    }
   
    getCartById(id){
        const carrito = this.carts.filter(cart=> cart.id === id)
        console.log(carrito)
        return carrito   
    }
    getAllCarts(){
        return this.carts
    }
    deleteCartById(id){
        const objeto = this.carts.filter(item=>item.id!=id)
        this.carts = objeto  
    }
    deleteProductofCartById(id,id_prod){
        const index=this.carts.findIndex(element=>element.id==id)
        const finalCart= this.carts[index].products.filter(item=>item.id!=id_prod)
        console.log(finalCart)
        this.carts[index].products=finalCart
    }
    insertProductById(id,productInsert){
        const index=this.carts.findIndex(element=>element.id==id)
        this.carts[index].products.push(productInsert) 
    }

    newCart(){
        if(this.carts.length==0){
            const elemento = {
                timestamp:Date.now(), 
                id:1,
                products:[]
            }
            this.carts.push(elemento)
            return elemento
        }else{
           const lastIndex = this.carts[this.carts.length-1].id
           const Index= lastIndex + 1
           const elemento = {
            timestamp:Date.now(),
            id:Index,
            products:[]
            }
            this.carts.push(elemento)
            return elemento
        }
    }

}

module.exports= CarritoContainer