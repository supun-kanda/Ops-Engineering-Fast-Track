//const DB = new Object();
const DB = new Array();
var varID = 0;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pos = mysql.createConnection({ host: 'localhost', user: 'root', password: 'gvt123', database: 'POS' });
pos.connect(err => {
    if (err) throw err;
    console.log('Connected to DB-POS');
});
/* GET home page. */

function respond(res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
}
router.get('/', (req, res) => respond.call(DB, res));

router.post('/', (req, res) => {
    //DB[req.body.id] = req.body;
    DB.push({ id: varID, name: req.body.name });
    respond.call({ id: varID }, res);
    varID++;
});

router.delete('/', (req, res) => {
    DB.forEach(item => {
        if (req.body.includes(item.id.toString())) {
            DB.splice(DB.indexOf(item), 1);
        }
    });
    res.status(200);
    res.end();
});

router.post('/signin', (req, res) => {
    //const send = {success:true};
    pos.query('SELECT (password) FROM user WHERE username = \'' + req.body.name + '\'', (err, result) => {
        if (err) next(err);
        if (result.length && result[0].password == req.body.password) res.status(200);
        else res.status(401);
        res.end();
    });
});

router.post('/signup', (req, res) => {
    var send;
    pos.query('INSERT INTO user VALUES ?', [[req.body]], (err, result) => {
        switch ((err) ? err.errno : -1) {
            case 1062: //ER_DUP_ENTRY
                console.log('Handled Err:[%d]%s', err.errno, err.code);
                var key = err.sqlMessage.split(/Duplicate entry '.+' for key /)[1]; // Error message is exact. Just extracting the key
                key = (key == '\'PRIMARY\'') ? 'username' : key.substring(1, key.length - 1);
                res.status(200);
                return res.send(JSON.stringify({ success: false, key: key }));
            case -1:
                console.log('Inserted Value');
                res.status(200);
                return res.send(JSON.stringify({ success: true }));
            default:
                console.log('Error Didnt Handled Err:[%d]%s \nMSG: %s', err.errno, err.code, err.sqlMessage);
                return res.send(JSON.stringify({ success: false, key: false, err:err.errno+": "+err.sqlMessage }));
        }
    });
});

module.exports = { router, DB };
