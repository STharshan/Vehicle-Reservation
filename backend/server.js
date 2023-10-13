const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
 
const bcrypt = require('bcrypt'); // https://www.npmjs.com/package/bcrypt npm i bcrypt
var jwt = require('jsonwebtoken'); //https://github.com/auth0/node-jsonwebtoken npm install jsonwebtoken
 
const app = express();
const port = 3001
 
app.use(express.json());
app.use(cors());
 
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Tharsan@6",
    database: "isec_assessment2"
})
 
con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})
 
app.get("/getvehicle", (req, res) => {
    const sql = "SELECT * FROM vehicle_service";
    con.query(sql, (error, result) => {
        if(error) return res.json({Error: "Get vehicles error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})
 
 
app.delete('/delete/:booking_id', (req, res) => {
    const booking_id = req.params.booking_id;
    const sql = "Delete FROM vehicle_service WHERE booking_id = ?";
    con.query(sql, [booking_id], (error, result) => {
        if(error) return res.json({Error: "delete vehicles error in sql"});
        return res.json({Status: "Success"})
    })
})


app.post('/create', (req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const location = req.body.location;
    const vehicle_no = req.body.vehicle_no;
    const mileage = req.body.mileage;
    const message = req.body.message;
  
    con.query("INSERT INTO vehicle_service (date, time, location, vehicle_no, mileage, message) VALUES (?, ?, ?, ?, ?, ?)", [date, time, location, vehicle_no, mileage, message], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        }
    );
});
 
app.get('/hash', (req, res) => { 
    bcrypt.hash("123456", 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            hash
        ]
        return res.json({result: hash});
    } )
})
 
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                    return res.json({Status: "Success", Token: token})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
            })
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})
 
app.post('/register',(req, res) => {
    const sql = "INSERT INTO users (`name`, `country`, `phone`, `email`,`password`) VALUES (?)"; 
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.country,
            req.body.phone,
            req.body.email,
            hash,
        ]
        con.query(sql, [values], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT DETAILS!"})
            }
        })
    } )
})
 

app.listen(port, () => {
  console.log(`Vehicle Reservation app listening on port ${port}`)
})