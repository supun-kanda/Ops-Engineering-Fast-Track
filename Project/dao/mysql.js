let mysql = require('mysql'),
config = require('../config/config'),
dbName = (process.env.NODE_ENV == 'test')? config.sqlNameForTest: config.sqlNameForApp,
userDB = mysql.createConnection({host:'localhost', user:'root', password:'gvt123', database:dbName});

userDB.connect(err => {
    if(err) {
        // console.log('Cannot Connect to DB-user: %s',err.code);
        throw err;
    }
    // else console.log('Connected to DB-user');
});

/**
 * 
 * @param {Object} user object which contains username and password
 * @returns {Promise} sql query result included in resolve
 */
function getUser(user){
    let query = 'SELECT userid,password FROM user WHERE username = \'' + user.username + '\'';
    
    return new Promise((resolve,reject) => {
        userDB.query(query, (err,result) => {
            if(err) 
                reject(err);
            resolve(result);
        });
    });
}

function getUserID(username){
    let query = 'SELECT userid FROM user WHERE username = \'' + username + '\'';

    return new Promise((resolve,reject) => {
        userDB.query(query, (err,result) => {
            if(err) 
                reject(err);
            resolve(result);
        });
    });
}


/**
 * 
 * @param {Array} user holds signup details such as username password and etc  
 * @returns {Promise} success included in resolve
 */
function insertUser(user){
    let query = 'INSERT INTO user VALUES ?';

    return new Promise((resolve,reject) => {
        userDB.query(query, [[user]], (err) => {
            if(err) 
                reject(err);
            resolve('Success');
        });
    });
}
module.exports = {getUser, getUserID, insertUser};