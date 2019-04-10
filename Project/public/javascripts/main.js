const itemPanel = document.getElementById('form'),
removeItems = new Array();
var name;
//Initiate Doc with existing Data
window.addEventListener('DOMContentLoaded', (event) => {
    fetch("/item/getAll",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "GET"
    })
    .then((res) => {
        if(res.status==200) return res.json();
        else throw Error('Bad Response');
    }).then((data) => {// check for an array
        data.forEach((item) => {
            div = document.createElement('div');
            div.textContent = item.name;
            div.setAttribute('class', 'custom-div');
            div.setAttribute('id', item._id);
            div.setAttribute('onclick', 'clicked(this.id)');
            itemPanel.appendChild(div);
        });
    }).catch((err) => console.log(err)); 
});

function remover(){
    fetch("/item/delete",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "DELETE",
        body:JSON.stringify(removeItems)
    })
    .then((res) => {
        if(res.status==200) {
            removeItems.forEach(function(item){
                itemPanel.removeChild(document.getElementById(item));
            });
            removeItems.length = 0;
        }else throw Error('Bad Response');
    }).catch((err) => console.log(err));
}

function adder(){
    name = document.getElementById('item-name').value;
    if(name){
        fetch("/item/insert",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body:JSON.stringify({name:name})
        })
        .then((res) => {
            if(res.status==200) return res.json(); 
            else throw Error('Bad Response');
        }).then((data) => { // check for an array
            document.getElementById('item-name').value = "";
            div = document.createElement('div');
            div.textContent = name;
            div.setAttribute('class', 'custom-div');
            div.setAttribute('id', data.id.toString());
            div.setAttribute('onclick', 'clicked(this.id)');
            itemPanel.appendChild(div);
        }).catch((err) => console.log(err));
    }
}

function clicked(id){
    var index = removeItems.indexOf(id);
    if(index<0){
        document.getElementById(id).style.backgroundColor = "gray";
        removeItems.push(id);
    }else{
        document.getElementById(id).style.backgroundColor = "darkgray";
        document.getElementById(id).setAttribute('class', 'custom-div');
        removeItems.splice(index, 1);
    }
}

function logout(){
    document.cookie = 'userid=;'
    window.location.href = '/sign/in';
}