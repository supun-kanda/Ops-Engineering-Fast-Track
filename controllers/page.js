let path = require('path');
let db = require('../dao/mysql');

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary Send the main pos page on request if only the users is signed in. Unless redirected to signin page
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function mainPage(req,res){
    db.getUserID(req.params.username)
    .then(result => {
        if(result.length && result[0].userid == req.cookies.userid)
            res.sendFile(path.join(__dirname,"../client/old/public/html/pos.html"));
        else
            res.redirect('/sign/in');
    })
    .catch(err=>errorPage(res,err));
}

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary send the sign in page on response
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function signinPage(req,res){
    res.sendFile(path.join(__dirname,"../client/old/public/html/index.html"));
}

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary send the sign up page on response
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function signupPage(req,res){
    res.sendFile(path.join(__dirname,"../client/old/public/html/signup.html"));
}

/**
 * 
 * @param {Response} res represents Express app HTTP response query string object 
 * @param {Error} error use error object to contain information in the error page
 * @returns response to render the error page included error details.
 */
function errorPage(res,error){
    res.status(500).render('error', { error: error });
}

module.exports = {mainPage,signinPage,signupPage,errorPage};