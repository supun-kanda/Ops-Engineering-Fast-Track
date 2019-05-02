let db = require('../dao/mongodb'),
errorPage = require('./page').errorPage;

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary The response body is included with an array of results which requested to userid
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function getAllItems(req,res){
    // let userid = req.cookies.userid;
    let userid = "48";
    db.getAllItems(userid)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
}

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object  
 * @summary inserts item object to db. response will be included with itemid id
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function insertItem(req,res){
    let userid = (req.cookies.userid)? req.cookies.userid: req.body.userid;
    let item = {userid:userid, name:req.body.name};//item object model
    db.insertOne(item) //insert object into db
    .then(item => res.status(200).send({id:item._id}))
    .catch(err => res.status(400).send(err));

}

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary requested ids will be removed from db
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function deleteItem(req,res){
    let ids = req.body;
    db.deleteMany(ids)
    .then(n => res.status(200).send({n:n, success:true}))
    .catch(err => res.status(400).send(err));
}

function clearAllItems(req,res){
    db.drop()
    .then(()=>res.status(200).send('cleared'))
    .catch(err=>{
        if(err.code==26)
            res.status(200).send('clear');
        else
            res.status(400).send(err)
    });
}
module.exports = {getAllItems, insertItem, deleteItem, clearAllItems};