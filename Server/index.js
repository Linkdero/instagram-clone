const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'artgram'
})

const protectedRoute = (req, res, next) => {
  try {
    const token = req.headers["authorization"]
    if (!token)
      return res.status(401).json({ error: "Unauthorized" })

    jwt.verify(token, 'llavesecreta', (err, decoded) => {
      if (err)
        return res.status(401).json({ error: "Unauthorized" })

      req.decoded = decoded
      next()
    })
  } catch (error) {
    console.error("Error en la ruta protegida :", error.message);
    next(); 
  }
}

require('./resources/users.js')(app, connection, protectedRoute)
require('./resources/posts.js')(app, connection, protectedRoute)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT} :)`)
})
