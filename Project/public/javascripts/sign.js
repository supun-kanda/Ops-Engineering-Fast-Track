function director(url){
    window.location.href = url;
}

function signin(){
    const username = document.getElementById("username").value,
    password = document.getElementById("password").value,
    info = document.getElementById("info");
    // const main = document.getElementById("main");

    fetch('/user/validate',{
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body:JSON.stringify({name:username, pw:password})
    })
    .then(res=>{
        if(res.status==200) 
            director('/main/'+username);
        else if(res.status==401) 
            info.innerHTML = 'Username or Password is wrong';
        else 
            throw Error('Bad Response');
    })
    .catch(err=>console.log(err));
}
function getSignUp(){
    director('/sign/up');
}

var prevEle={};
function signUp(){
    const ids = ['conpassword', 'name', 'username', 'password', 'email', 'mobile', 'address'];
    const valueArr = new Array();
    const valueObj = new Object();
    ids.forEach(id => {
        var propVal = document.getElementById(id).value;
        valueArr.push(propVal);
        valueObj[id] = propVal;
    });

    var result = validator(valueObj); // validate from front
    if(!result.success) {
        prevEle.innerHTML = "";
        document.getElementById('l'+result.key).innerHTML = result.msg;
        prevEle = document.getElementById('l'+result.key);
        return false;
    }

    valueArr[0] = null; // originally used 0th index as id which is assigned by the DB
    fetch('/user',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body:JSON.stringify(valueArr)
    })
    .then(res =>{
        // if(res.status==200) director('/sign');
        if(res.status==200) 
            return res.json();
        else 
            throw Error('Bad Response'); //check this
    })
    .then(data => {
        if(data.success) 
            director('/sign/in');
        else if(data.key){
            prevEle.innerHTML = "";
            document.getElementById('l'+data.key).innerHTML = "*Already Taken";
            prevEle = document.getElementById('l'+data.key);
        }else 
            console.log(data.err);
    })
    .catch(err => console.log(err));
}

function validator(values){
    var emptyResult = {success:true};
    const emptyCheck = ['mobile', 'email', 'conpassword', 'password', 'username', 'name'],
    unameReg = RegExp('^[.a-z0-9_-]{5,15}$'),
    emailReg = RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$'),
    mobiReg = RegExp('^[0-9]{10}$');

    emptyCheck.forEach(prop => {
        if(!values[prop].length) //empty values check
            emptyResult = {success:false, key:prop, msg:'Field Cannot be empty'};
    });
    if(!emptyResult.success)
        return emptyResult;
    if(values.conpassword != values.password) //password validation
        return {success:false, key:'conpassword', msg:'passwords does not match'};
    if(!emailReg.test(values.email)) //email validation
        return {success:false, key:'email', msg:'Invalid email address'};
    if(!mobiReg.test(values.mobile)) //mobile validation
        return {success:false, key:'mobile', msg:'Invalid mobile number'};
    if(!unameReg.test(values.username)) //username validation
        return {success:false, key:'username', msg:'Character range 5-10. Allowed only alphanumeric, underscore and dash'};
    return {success:true};
}