const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => {
    console.log('Responding to root router')
    res.send("Nodejs Setup is Done")
})

function getConnect(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root123',
        database:'NodemySql'

    })
}
// getConnect().connect((err)=>{
//     if(err) throw err;
//     console.log('Connected');
//     // const tableCreate = 'CREATE TABLE Book_Rack(bookId INT Primary Key,bookName VARCHAR(50),author VARCHAR(30),edition TINYINT,publishedYear DATE,publishedBy VARCHAR(30))';
//     const tableCreate = 'CREATE TABLE userInfo(userId INT Primary Key auto_increment,userName VARCHAR(30),userEmail VARCHAR(50),userMobileNo VARCHAR(10),city VARCHAR(30))';
//     getConnect().query(tableCreate,(err,res)=>{
//         if(err) throw err;
//         console.log('Table Created');
//     })
// })
// getConnect().connect((err)=>{
//     if(err) throw err;
//     console.log('Connected');
//     // const tableCreate = 'CREATE TABLE Book_Rack(bookId INT Primary Key,bookName VARCHAR(50),author VARCHAR(30),edition TINYINT,publishedYear DATE,publishedBy VARCHAR(30))';
//     const insert = 'INSERT INTO userInfo VALUES ?';
//     const values = [[null,"Bogu","bogu@gmail.com","*****88888","Guindy"]];
//     getConnect().query(insert,[values],(err,results)=>{
//         if(err) throw err;
//         console.log('Data Inserted ', results.affectedRows);
//     })
// })

app.get('/user',(req,res)=>{
    console.log('Fetch all userinfo');
    
    const fetchQuery = "SELECT * FROM userinfo";
    getConnect().query(fetchQuery,(err,rows,results)=>{
            if(err){
                console.log("Failed to Fetch");
                res.sendStatus(505);
                res.end();
                return;
            }
            console.log("Successfully Fetched");
            res.json(rows);
    })
})

app.get('/user/:userId',(req,res)=>{
    console.log('Fetch Using Id:',req.params.userId);
    
    const fetchById = "SELECT * FROM userinfo WHERE userId = ?";
    const value = req.params.userId;
    getConnect().query(fetchById,[value],(err,rows,fields)=>{
            if(err){
                console.log("Failed to Fetch",err);
                res.sendStatus(505);
                res.end();
                return;
            }
            console.log("Successfully Fetched");
            res.json(rows);
    })
})
app.listen(3010,() => {
console.log('Server Running Port 3010');
})
