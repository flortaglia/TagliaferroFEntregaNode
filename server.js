const express = require('express')
const app = express()
const rutas = require('./src/routes/index')
const puerto =8080 //para developer.......falta ver la parte de produccion como se hace???
const path = require('path')
const {engine}= require("express-handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine(
    "hbs",
    engine({
        extname:".hbs",
        defaultLayout:'index.hbs',
        layoutsDir:__dirname + "/views/layouts",
        partialsDir:__dirname + '/views/partials/'

    })
);
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')
// app.use('/views', express.static(`${__dirname}/views`))

app.use('/api', rutas)


// app.use((error, req, res) => {
//     res.status(error.httpStatusCode).send(error)
// })

app.listen(puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})