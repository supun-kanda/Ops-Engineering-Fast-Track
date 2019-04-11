let db = require('../dao/mysql'),
errorPage = require('./page').errorPage;
/**
 * @async
 * @param {Request} req represents Express app HTTP request query string object 
 * @param {Response} res represents Express app HTTP response query string object 
 * @summary validate the name and pw gets with the request body with the DAO and send the success response
 */
async function validateUser(req,res){
    let user = {username:req.body.name, password:req.body.pw}; //user object model
    try {
        let result = await db.getUser(user); //fetch username and password from db
        //Hanlde when reject
        //Validate req data with db data
        if (result.length && result[0].password == req.body.pw) res.cookie('userid',result[0].userid).status(200).send('validation success');
        else res.status(401).send('validation fail');
    } catch (err) {
        errorPage(res,err);
    }

}

/**
 * @async
 * @param {Request} req represents Express app HTTP request query string object 
 * @param {Response} res represents Express app HTTP response query string object 
 * @summary insert the user object model through DAO and sends error key whenever theres error
 */
async function insertUser(req,res){
    let user = req.body; //user object model
    try {
        await db.insertUser(user); //fetch into db
        // console.log('Inserted Value');
        res.status(200).send(JSON.stringify({ success: true }));
    } catch(err) {
        switch (err.errno) { //Hanlde errors
            case 1062: //ER_DUP_ENTRY
                // console.log('Handled Err:[%d]%s', err.errno, err.code);
                var key = err.sqlMessage.split(/Duplicate entry '.+' for key /)[1]; // Error message is exact. Just extracting the key
                key = (key == '\'PRIMARY\'' ) ? 'username' : key.substring(1, key.length - 1);
                return res.status(200).send(JSON.stringify({ success: false, key: key }));
            default:
                // console.log('Error Didnt Handled Err:[%d]%s \nMSG: %s', err.errno, err.code, err.sqlMessage);
                errorPage(res,err);
            //SHOULD HANDLE
            //empty error
        }
    }
}

/**
 * @async
 * @param {Request} req represents Express app HTTP request query string object 
 * @param {Response} res represents Express app HTTP response query string object 
 * @summary clear the cookie userid when ever a logout event happens so that the user cannot access main page without giving credentials.
 */
function clearCookie(req,res){
    res.clearCookie('userid').end();
}

module.exports = {validateUser, insertUser, clearCookie};