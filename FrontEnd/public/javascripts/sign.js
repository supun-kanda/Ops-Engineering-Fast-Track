function director(url){
    //fetch(url).then((res)=>{redirect: window.location.replace(url)});
    window.location.href = url;
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

function signUp(){
    const ids = ['name', 'username', 'password', 'email', 'mobile', 'address'];
    const values = new Array();
    //Validate all
    ids.forEach(id=>values.push(document.getElementById(id).value));
    values.unshift(null);
    console.log(values);
    fetch('/db/signup',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body:JSON.stringify(values)
    })
    .then(res =>{
        if(res.status==200) director('/sign');
        else throw Error('Bad Response');
    })
    .catch(err => console.log(err));

}