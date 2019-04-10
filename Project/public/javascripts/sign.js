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
        if(res.status==200) director('/main/'+username);
        else if(res.status==401) info.innerHTML = 'Username or Password is wrong';
        else throw Error('Bad Response');
    })
    .catch(err=>console.log(err));
}
function getSignUp(){
    director('/sign/up');
}

var prevEle={};
function signUp(){
    const ids = ['name', 'username', 'password', 'email', 'mobile', 'address'];
    const values = new Array();
    //Validate all
    ids.forEach(id=>values.push(document.getElementById(id).value));
    values.unshift(null);
    fetch('/user/insert',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body:JSON.stringify(values)
    })
    .then(res =>{
        // if(res.status==200) director('/sign');
        if(res.status==200) return res.json();
        else throw Error('Bad Response');
    })
    .then(data => {
        if(data.success) director('/sign/in');
        else if(data.key){
            prevEle.innerHTML = "";
            document.getElementById('l'+data.key).innerHTML = "*Already Taken";
            prevEle = document.getElementById('l'+data.key);
        }else console.log(data.err);
    })
    .catch(err => console.log(err));
}