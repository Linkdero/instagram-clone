const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'artgram'
})

module.exports = {
    getUsers() {
        connection.connect()

        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) throw error;
            return results
        })

        connection.end()
    },
    query(sql, callback) {
        connection.connect()

        connection.query(sql, (error, results) => {
            if (error) throw error;
            return callback(results)
        })
        
        connection.end()
    }
}