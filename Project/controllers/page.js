let path = require('path');

function mainPage(req,res){
    if(req.cookies.userid) return res.sendFile(path.join(__dirname,"../public/html/pos.html")); //why returning
    else return res.redirect('/sign/in');
};
function signinPage(req,res){
    return res.sendFile(path.join(__dirname,"../public/html/index.html"));
};
function signupPage(req,res){
    return res.sendFile(path.join(__dirname,"../public/html/signup.html"));
};
module.exports = {mainPage,signinPage,signupPage};