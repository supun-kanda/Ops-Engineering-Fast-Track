var itemsDB,
router = require('express').Router(),
mysql = require('mysql'),
mongoDB = require('mongodb'),
client = mongoDB.MongoClient,
usersDB = mysql.createConnection({ host: 'localhost', user: 'root', password: 'gvt123', database: 'POS' });

client.connect('mongodb://localhost:27017/pos', (err,client) => {
    if(err) {
        console.log('Cannot Connect to DB-Items: %s',err.code);
        throw err;
    }
    else {
        itemsDB = client.db('pos');
        console.log('Connected to DB-Items');
    }
});
usersDB.connect(err => {
    if (err) {
        console.log('Cannot Connect to DB-POS: %s',err.code);
        throw err;
    }
    console.log('Connected to DB-POS');
});

function respond(res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
}


router.get('/items', (req, res) => {
    itemsDB.collection('items').find().toArray((err,result) => {
        respond.call(result, res);
    });
});

router.post('/items', (req, res) => {
    var insertObj = {name:req.body.name};
    itemsDB.collection('items').insertOne(insertObj, (err) => {
        if(err) throw err;
        respond.call({ id: insertObj._id }, res);
    });
});

router.delete('/items', (req, res) => {
    const idObj = req.body.map(id => new mongoDB.ObjectID(id) );
    itemsDB.collection('items').deleteMany({_id:{'$in':idObj}}, (err,result) => {
        if(err) throw err;
        console.log("Successfully deleted %d items",result.result.n);
    });
    res.status(200).end();
});

router.post('/signin', (req, res) => {
    usersDB.query('SELECT userid,password FROM user WHERE username = \'' + req.body.name + '\'', (err, result) => {
        if (err) next(err);
        if (result.length && result[0].password == req.body.password) res.cookie('userid',result[0].userid).status(200).end();
        else res.status(401).end();
    });
});

router.post('/signup', (req, res) => {
    usersDB.query('INSERT INTO user VALUES ?', [[req.body]], (err, result) => {
        switch ((err) ? err.errno : -1) {
            case 1062: //ER_DUP_ENTRY
                console.log('Handled Err:[%d]%s', err.errno, err.code);
                var key = err.sqlMessage.split(/Duplicate entry '.+' for key /)[1]; // Error message is exact. Just extracting the key
                key = (key == '\'PRIMARY\'') ? 'username' : key.substring(1, key.length - 1);
                return res.status(200).send(JSON.stringify({ success: false, key: key }));
            case -1:
                console.log('Inserted Value');
                return res.status(200).send(JSON.stringify({ success: true }));
            default:
                console.log('Error Didnt Handled Err:[%d]%s \nMSG: %s', err.errno, err.code, err.sqlMessage);
                return res.status(200).send(JSON.stringify({ success: false, key: false, err:err.errno+": "+err.sqlMessage }));
        }
    });
});

module.exports = { router };
