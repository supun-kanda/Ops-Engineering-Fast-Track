var db = require('../dao/mysql');

async function validateUser(req,res){
    var user = {username:req.body.name, password:req.body.pw}, //user object model
    result = await db.getUser(user); //fetch username and password from db
    //Hanlde when reject
    //Validate req data with db data
    if (result.length && result[0].password == req.body.pw) res.cookie('userid',result[0].userid).status(200).send('validation success');
    else res.status(401).send('validation fail');

};

async function insertUser(req,res){
    var user = req.body; //user object model
    try {
        await db.insertUser(user); //fetch into db
        console.log('Inserted Value');
        res.status(200).send(JSON.stringify({ success: true }));
    } catch(err) {
        switch (err.errno) { //Hanlde errors
            case 1062: //ER_DUP_ENTRY
                console.log('Handled Err:[%d]%s', err.errno, err.code);
                var key = err.sqlMessage.split(/Duplicate entry '.+' for key /)[1]; // Error message is exact. Just extracting the key
                key = (key == '\'PRIMARY\'') ? 'username' : key.substring(1, key.length - 1);
                res.status(200).send(JSON.stringify({ success: false, key: key }));
            default:
                console.log('Error Didnt Handled Err:[%d]%s \nMSG: %s', err.errno, err.code, err.sqlMessage);
                res.status(200).send(JSON.stringify({ success: false, key: false, err:err.errno+": "+err.sqlMessage }));
            //SHOULD HANDLE
            //empty error
        }
    }
};

function clearCookie(req,res){
    return res.clearCookie('userid').end();
}

function delUser(req,res){
    return res;
};

module.exports = {validateUser, insertUser, clearCookie};