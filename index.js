const bodyParser = require('body-parser')
const express = require('express')
const db = require('./connection')
const response = require('./response')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if(err) throw err
        response(200, fields, "filter by id", res)
    })})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `select * from mahasiswa where nim = ${nim}`

    db.query(sql, (err, fields) => {
        if(err) throw err   
        response(200, fields, "Get detail mahasiswa", res)
    })

})

app.post("/mahasiswa", (req, res) => {
    const {nim, nama_lengkap, kelas, alamat} = req.body
    console.log(req.body)
    const sql = `insert into mahasiswa (nim, nama_lengkap, kelas, alamat) values (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}')`

    db.query(sql, (err, fields) => {
        if(err) response(500, "invalid", "error", res)
        if(fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId

            }
            response(200, data, "post dta berhasil", res)
        } else {
            console.log("data gagal masuk")
        }
    })

})

app.put("/mahasiswa", (req, res) => {
    const {nim, nama_lengkap, kelas, alamat} = req.body
    const sql = `update mahasiswa set nama_lengkap='${nama_lengkap}', kelas='${kelas}', alamat='${alamat}' where nim='${nim}'   `

    db.query(sql, (err, fields) => {
        if(err) response(500, "invalid", "error", res)
        if(fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message

            }
            response(200, data, "update dta berhasil", res)
        } else {
            response(404, "user not found", "error", res)
        }
    })


})

app.delete("/mahasiswa", (req, res) => {
    const {nim} = req.body
    const sql = `delete  from mahasiswa where nim= '${nim}'`

    db.query(sql, (err, fields) => {
        if(err) response(500, "invalid", "error", res)
        if(fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,

            }
            response(200, data, "hapus dta berhasil", res)
        } else {
            response(404, "user not found", "error", res)
        }
    })


})





// app.get('/', (req, res) => {
//     const sql = "SELECT * FROM mahasiswa"

//     db.query(sql, (error, result) => {
//         response(200, result, "Get all data from mahasiswa", res)
        
//     })
// })

// app.get('/find', (req, res) => {
//     const sql = `SELECT nama_lengkap FROM mahasiswa where nim = ${req.query.nim}`

//     db.query(sql, (error, result) => {
//         response(200, result, "Find Mahasiswa namr", res)
        
//     })
// })


// app.get('/hello', (req, res) => {
//     console.log({params: req.query})
//     res.send('LALALLLALALAA!')
// })

// app.post('/login', (req, res) => {
//     console.log({ requestFromOutside: req.body })
//     res.send('Login Berh    asil!')
// })

// app.put('/username', (req, res) => {
//     console.log({ update: req.body })
//     res.send('update Berhasil!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})