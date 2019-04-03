//const DB = new Object();
const DB = new Array();
var varID = 0;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pos = mysql.createConnection({host:'localhost', user:'root', password:'gvt123', database:'POS'});
pos.connect(err => {
    if(err) throw err;
    console.log('Connected to DB-POS');
});
/* GET home page. */

function respond(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
}
router.get('/', (req,res) => respond.call(DB,req,res));

router.post('/', (req, res) => {
    //DB[req.body.id] = req.body;
    DB.push({id:varID, name:req.body.name});
    respond.call({id:varID},req,res);
    varID++;
});

router.delete('/',(req,res) => {
    DB.forEach(item => {
        if(req.body.includes(item.id.toString())){
            DB.splice(DB.indexOf(item),1);
        }
    });
    res.status(200);
    res.end();
});

router.post('/signin', (req,res) => {
    //const send = {success:true};
    pos.query('SELECT (password) FROM user WHERE username = \''+req.body.name+'\'', (err, result)=>{
        if(err) throw err;
        if (result.length && result[0].password==req.body.password) res.status(200);
        else res.status(401);
        res.end();
    });
});

router.post('/signup', (req,res) => {
    //const send = {success:true};
    console.log(req.body);
    pos.query('INSERT INTO user VALUES ?',[[req.body]], (err, result)=>{
        if(err) throw err;
        res.status(200);
        res.end();
    });
});

module.exports = {router,DB};
