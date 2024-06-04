// Cargar los módulos
const express = require('express')
const mysql = require('mysql')
const path = require('path')

// Iniciar las rutas
const router = express.Router()

//Conexión a la base de datos
const configConnection = {
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'cars'
}
const connection = mysql.createConnection(configConnection)

// Ruta raíz
router.get('/', (req, res) => {
    const colores = {coche: 'red', moto: 'blue', furgoneta: 'green'}
    const selectAll = 'SELECT * FROM modelos'
    connection.query(selectAll, (err, result) => {
        if(err) throw err
        else {
                res.render('index', { h2 : 'Our bests cars', result, colores})
        }
    
    })
    // res.render('index', { h2 : 'Our wonderfoul cars'})
    // res.send('Bienvenido, funciona el router')
})

module.exports = router