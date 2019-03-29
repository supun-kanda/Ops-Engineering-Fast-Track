//const DB = new Object();
const DB = new Array();
var varID = 0;
var express = require('express');
var router = express.Router();

/* GET home page. */

function respond(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
}
router.get('/', (req,res) => respond.call(DB,req,res));

router.post('/', function(req, res) {
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

module.exports = {router,DB};
