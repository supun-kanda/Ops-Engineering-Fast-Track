var db = require('../dao/mongodb');

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary The response body is included with an array of results which requested to userid
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function getAllItems(req,res){
    var userid = req.cookies.userid;
    db.getAllItems(userid)
    .then(result => res.status(200).send(result))
    .catch(err => {
        console.log(err);//Handle Error
    });
};

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object  
 * @summary inserts item object to db. response will be included with itemid id
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function insertItem(req,res){
    var item = {userid:req.cookies.userid, name:req.body.name};//item object model
    db.insertOne(item) //insert object into db
    .then(item => res.status(200).send({id:item._id}))
    .catch(err => {
        console.log(err) //Handle Error
    });

};

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary requested ids will be removed from db
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function deleteItem(req,res){
    var ids = req.body;
    db.deleteMany(ids)
    .then(n => res.status(200).send('Successfully deleted' + n + 'Items'))
    .catch(err => {
        console.log(err); //Handle Error
    });
};

module.exports = {getAllItems, insertItem, deleteItem};