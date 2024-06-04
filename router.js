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

let tipos = []

const selectTipos = 'SELECT DISTINCT(tipo) FROM modelos GROUP BY tipo'
connection.query(selectTipos, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        tipos = result
    }
})

// Ruta raíz
router.get('/', (req, res) => {
    const selectAll = 'SELECT * FROM modelos'
    connection.query(selectAll, (err, result) => {
        if (err) throw err
        else {
            res.render('index', { h2: 'Our bests cars', result, tipos })
        }

    })
    // res.render('index', { h2 : 'Our wonderfoul cars'})
    // res.send('Bienvenido, funciona el router')
})

// Ruta vehiculo
router.get('/type/:tipo', (req, res) => {
    const tipo = req.params.tipo
    const selectTipo = `SELECT * FROM modelos WHERE tipo = '${tipo}'`
    connection.query(selectTipo, (err, result) => {
 
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0) {
                res.render('error', { h2: 'Our wonderfoul cars', tipos})
            }
            const titulo = tipo[0].toUpperCase() + tipo.slice(1) + "s"
            res.render('index', { h2: titulo, result, tipos })
        }

    })
    // res.render('index', { h2 : 'Our wonderfoul cars'})
    // res.send('Bienvenido, funciona el router')
})

module.exports = {router, tipos}