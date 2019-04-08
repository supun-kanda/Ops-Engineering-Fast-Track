function director(url){
    //fetch(url).then((res)=>{redirect: window.location.replace(url)});
    window.location.href = url;
}
function backEndPrinter(send){
    fetch('/util/print',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body:JSON.stringify(send)
    });
}
function signin(){
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    const info = document.getElementById("info");
    // const main = document.getElementById("main");

    fetch('/db/signin',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body:JSON.stringify({name:userName.value, password:password.value})
    })
    .then(res=>{
        if(res.status==200) director('/main');
        else if(res.status==401) info.innerHTML = 'Username or Password is wrong';
        else throw Error('Bad Response');
    })
    .catch(err=>console.log(err));
}
function getSignUp(){
    director('/sign/newUser');
}

var prevEle={};
function signUp(){
    const ids = ['name', 'username', 'password', 'email', 'mobile', 'address'];
    const values = new Array();
    //Validate all
    ids.forEach(id=>values.push(document.getElementById(id).value));
    values.unshift(null);
    fetch('/db/signup',{
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
        if(data.success) director('/sign');
        else if(data.key){
            prevEle.innerHTML = "";
            document.getElementById('l'+data.key).innerHTML = "*Already Taken";
            prevEle = document.getElementById('l'+data.key);
        }else console.log(data.err);
    })
    .catch(err => console.log(err));
}