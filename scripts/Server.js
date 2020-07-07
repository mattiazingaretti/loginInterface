const express = require('express');
const cors = require('cors')
var app = express()

app.use(cors())
//to be fix CORS

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//DB section
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "users"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get('/', (req, res) => {
  return res.send('');
});

app.post('/signup', (req, res) => {  
  //First check if it is already in DB
  var sql1 = "SELECT * FROM userdata WHERE email = '" + req.body.email + " '"
  con.query(sql1, function (err, result) {
    if (err) throw err;
    //If user already in DB
    if (result.length > 0) {
      return res.status(400).send({ error: "FAIL User already registerd!", data:req.body.email })
    } else {
      //Append new user into DB
      var sql = "INSERT INTO userdata (email, password) VALUES ('" + req.body.email + " ', '" + req.body.password + " ')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User inserted");
        res.json({ success: "OK", data: req.body.email });
      });
    }
  })
  
});

app.post('/login', (req, res) => {

  let sql = 'SELECT email,password FROM userdata '
  con.query(sql, (err, results) =>{
    if (err) throw err;
    encodeURI(req.body.email)//In order to avoid bad string comparison
    encodeURI(req.body.password)
    for(let i = 0; i < results.length; i++){
      encodeURI(results[i].email)
      encodeURI(results[i].password)
      if(results[i].email.trim() == req.body.email.trim() && results[i].password.trim() == req.body.password){
        return res.status(200).send({success:'OK',user:req.body.email})
      }
    }
      return res.status(404).send({ error: 'User not registered', user: req.body.email })
    
  })
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(5555, function () {
  console.log(`Example app listening on port 5555`)
});
