const url = 'http://localhost:3000/main';
/*
function director(){
    fetch('http://localhost:3000/main').
    then((res)=>{
        res.text().
        then((text) => {document.write(text);});});
}
*//*
function director(){
    fetch(url, { method: 'GET', redirect: 'follow'})
        .then(response => {
            // HTTP 301 response
            console.log("Response aquired");
        })
        .catch(function(err) {
            console.log(err + " url: " + url);
    });
}
*/