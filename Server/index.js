const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

app.use(cors())
app.use(express.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'artgram'
})

const protectedRoute = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token)
        return res.status(401).json({ error: "Unauthorized" })

    jwt.verify(token, 'llavesecreta', (err, decoded) => {
        if (err)
            return res.status(401).json({ error: "Unauthorized" })

        req.decoded = decoded
        next()
    })
}

app.post('/api/users/login', (req, res) => {
    connection.query("SELECT email, password from users where email = '" + req.body.email + "'", (err, result) => {
        if (err) throw err

        if (!result[0])
            return res.json({ error: "Usuario no encontrado" })

        bcrypt.compare(req.body.password, result[0].password, (err, ok) => {
            if (!ok)
                return res.json({ error: "Contraseña incorrecta" })

            var userData = {
                id: result[0].user_id
            }

            jwt.sign(userData, 'llavesecreta', {}, (err, token) => {
                if (err) throw err
                return res.json({ token: token })
            })
        })
    })
})

app.post('/api/users/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, password) => {
        connection.query("INSERT INTO users (email, password) VALUES ('" + req.body.email + "','" + password + "')", (err, result) => {
            if (err) throw err

            var userData = {
                email: req.body.email
            }

            jwt.sign(userData, 'llavesecreta', {}, (err, token) => {
                if (err) throw err
                res.json({ token: token })
            })

        })
    })
})

app.get('/api/users/profile', protectedRoute, (req, res) => {
    res.json({
        email: "Hola mundo"
    })
})


app.listen(4000, () => {
    console.log("El servidor esta funcionando en el puerto 4000 :)")
})