var itemDB,
mongo = require('mongodb'),
mongoClient = mongo.MongoClient;
mongoClient.connect('mongodb://localhost:27017/pos',{ useNewUrlParser: true }, (err,client) => {
    if(err) throw err;
    itemDB = client.db('pos').collection('items');
    // console.log('Connected to DB-items');
});

/**
 * @param {String} userid userid of your username
 * @returns {Promise} fetched array will be included in resolve. Error will include in reject
 * @example
 * getAllItems(3).then(item => //the same itemObject inserted with property _id added)
 */
function getAllItems(userid){
    return new Promise((resolve,reject) => {
        itemDB.find( {userid: {$eq:userid}} ).toArray((err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

/**
 * @param {Object} itemObject which includes name, userid 
 * @returns {Promise} fetched array will be included in resolve. Error will include in reject
 * @example
 * insertOne({userid:2,name:'Jhon'}).then(item => //the same itemObject inserted with property _id added)
 */
function insertOne(item){
    return new Promise((resolve,reject) => {
        itemDB.insertOne(item, err => {
            if(err) reject(err);
            resolve(item);
        });
    });
}

/**
 * @param {Array} itemids you want to delete from DB
 * @returns {Promise} fetched array will be included in resolve. Error will include in reject
 * @example
 * deleteMany(['5cae241f56e2df3ef3e4d76f','5cae243f56e2df3ef3e4d771']).then(n=>//deleted n numberof items)
 */
function deleteMany(ids){
    let objectIDs = ids.map(id => new mongo.ObjectID(id));
    return new Promise((resolve,reject) => {
        itemDB.deleteMany({_id:{'$in':objectIDs}}, (err,result) => {
            if(err) reject(err);
            resolve(result.result.n);
        });
    });
}

module.exports = {getAllItems, insertOne, deleteMany};