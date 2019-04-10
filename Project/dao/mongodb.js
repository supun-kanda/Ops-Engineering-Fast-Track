var itemDB,
mongo = require('mongodb'),
mongoClient = mongo.MongoClient;

mongoClient.connect('mongodb://localhost:27017/pos', (err,client) => {
    if(err) throw err; //handle error
    itemDB = client.db('pos').collection('items');
    console.log('Connected to DB-items');
});

function getAllItems(){
    return new Promise((resolve,reject) => {
        itemDB.find().toArray((err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

function insertOne(item){
    return new Promise((resolve,reject) => {
        itemDB.insertOne(item, err => {
            if(err) reject(err);
            resolve(item);
        });
    });
}

function deleteMany(ids){
    var objectIDs = ids.map(id => new mongo.ObjectID(id));
    return new Promise((resolve,reject) => {
        itemDB.deleteMany({_id:{'$in':objectIDs}}, (err,result) => {
            if(err) reject(err);
            resolve(result.result.n);
        });
    });
}

module.exports = {getAllItems, insertOne, deleteMany};