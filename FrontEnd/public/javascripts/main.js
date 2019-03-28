const itemPanel = document.getElementById('form'),
removeItems = new Array();
var name;
//Initiate Doc with existing Data
window.addEventListener('DOMContentLoaded', (event) => {
    fetch("/db",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "GET"
    })
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
            div = document.createElement('div');
            div.textContent = item.name;
            div.setAttribute('class', 'custom-div');
            div.setAttribute('id', item.id);
            div.setAttribute('onclick', 'clicked(this.id)');
            itemPanel.appendChild(div);
        });
    }).catch((err) => console.log(err));
});

function remover(){
    removeItems.forEach(function(item){
        itemPanel.removeChild(document.getElementById(item));
    });
    removeItems.length = 0;
}

function adder(){
    name = document.getElementById('item-name').value;
    if(name){
        fetch("/db",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body:JSON.stringify({name:name})
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('item-name').value = "";
            div = document.createElement('div');
            div.textContent = name;
            div.setAttribute('class', 'custom-div');
            console.log(data.id)
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