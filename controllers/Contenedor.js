const fs =require('fs')
const path = require('path');
const { listenerCount } = require('process');

class Contenedor{
    constructor(){
        this.productos= [];
    }
   
    async getById(id){
        this.productos = await leer('listaProductos')
        const elemento = this.productos.filter(producto=> producto.id === id)
        console.log(elemento)
        return elemento   
    }
    async getAll(){
        this.productos = await leer('listaProductos')
        return this.productos
    }
    async deleteById(id){
        this.productos = await leer('listaProductos')
        const objeto = this.productos.filter(item=>item.id!=id)
        this.productos = objeto  
    }
    
    async update(id, title, description, code, price, thumbnail, timestamp, stock){
        this.productos = await leer('listaProductos')
        const index=this.productos.findIndex(element=>element.id==id)
        console.log(index)
        this.productos[index].title=title
        this.productos[index].price=price
        this.productos[index].thumbnail=thumbnail
        this.productos[index].description=description
        this.productos[index].code=code
        this.productos[index].stock=stock
        this.productos[index].timestamp=timestamp
      
        console.log(this.productos)        
    }
    async newProduct(title, description, code, price, thumbnail, timestamp, stock){
        this.productos = await leer('listaProductos')
        if(this.productos.length==0){
            const elemento = {
                title,
                price,
                thumbnail,
                description, 
                code,
                timestamp:Date.now(), 
                stock,
                id:1
            }
            this.productos.push(elemento)
            return elemento
        }else{
           const lastIndex = this.productos[this.productos.length-1].id
           const Index= lastIndex + 1
           const elemento = {
            title,
            price,
            thumbnail,
            description, 
            code,
            timestamp:Date.now(),
            stock,
            id:Index
            }
            this.productos.push(elemento)
            return elemento
        }
    }

}

module.exports= Contenedor