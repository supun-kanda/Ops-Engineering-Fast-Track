var mysql = require('mysql'),
userDB = mysql.createConnection({host:'localhost', user:'root', password:'gvt123', database:'POS'});

userDB.connect(err => {
    if(err) {
        console.log('Cannot Connect to DB-user: %s',err.code);
        throw err;
    }
    else console.log('Connected to DB-user');
});

function getUser(user){
    var query = 'SELECT userid,password FROM user WHERE username = \'' + user.username + '\'';
    
    return new Promise((resolve,reject) => {
        userDB.query(query, (err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

function insertUser(user){
    var query = 'INSERT INTO user VALUES ?';

    return new Promise((resolve,reject) => {
        userDB.query(query, [[user]], (err,result) => {
            if(err) reject(err);
            resolve('Success');
        });
    });
}
module.exports = {getUser, insertUser};