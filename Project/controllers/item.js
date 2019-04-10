var db = require('../dao/mongodb');

function getAllItems(req,res){
    var userid = req.cookies.userid;
    db.getAllItems(userid)
    .then(result => res.status(200).send(result))
    .catch(err => {
        console.log(err);//Handle Error
    });
};
function insertItem(req,res){
    var item = {userid:req.cookies.userid, name:req.body.name};//item object model
    db.insertOne(item) //insert object into db
    .then(item => res.status(200).send({id:item._id}))
    .catch(err => {
        console.log(err) //Handle Error
    });

};
function deleteItem(req,res){
    var ids = req.body;
    db.deleteMany(ids)
    .then(n => res.status(200).send('Successfully deleted' + n + 'Items'))
    .catch(err => {
        console.log(err); //Handle Error
    });
};

module.exports = {getAllItems, insertItem, deleteItem};