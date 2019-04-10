let path = require('path');

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary Send the main pos page on request if only the users is signed in. Unless redirected to signin page
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function mainPage(req,res){
    if(req.cookies.userid) return res.sendFile(path.join(__dirname,"../public/html/pos.html")); //why returning
    else return res.redirect('/sign/in');
};

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary send the sign in page on response
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function signinPage(req,res){
    return res.sendFile(path.join(__dirname,"../public/html/index.html"));
};

/**
 * 
 * @param {Request} request represents Express app HTTP request query string object 
 * @param {Response} response represents Express app HTTP response query string object 
 * @summary send the sign up page on response
 * @see
 * https://expressjs.com/en/api.html#req, https://expressjs.com/en/api.html#res
 */
function signupPage(req,res){
    return res.sendFile(path.join(__dirname,"../public/html/signup.html"));
};

module.exports = {mainPage,signinPage,signupPage};