const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config") //import konfigurasi database

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//end-point akses data siswa
app.get("/siswa", (req,res) => {
    //create sql query
    let sql = "select * from siswa"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message //pesan error
            }
        }else{
            response = {
                count : result.length, //jumlah data
                siswa : result
            }
        }
        res.json(response) //send response
    })
})

//end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/siswa/:id", (req,res) => {
    let data = {
        id_siswa : req.params.id
    }
    let sql = "select * from siswa where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message 
            }
        }else{
            response = {
                count : result.length,
                siswa : result
            }
        }
        res.json(response)
    })
})

//MENAMBAHKAN DATA
app.post("/siswa", (req,res) => {
    let data = {
        nis : req.body.nis,
        nama_siswa  : req.body.nama_siswa,
        kelas : req.body.kelas
    }

    let sql = "insert into siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//MENGUBAH DATA
app.put("/siswa/:id", (req,res) => {
    let data = [
        //data
        {
            nis : req.body.nis,
            nama_siswa : req.body.nama_siswa,
            kelas : req.body.kelas
        },
        //parameter (primary key)
        {
            id_siswa : req.params.id
        }
    ]
    
    let sql = "update siswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//MENGHAPUS DATA
app.delete("/siswa/:id", (req,res) => {
    //prepare data
    let data =
        //parameter (primary key)
        {
            id_siswa : req.params.id
        }
    

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//membuat web server dengan port 8000
app.listen(8000, () => {
    console.log("server run on port 8000")
})