const itemPanel = document.getElementById('form'),
items = new Array();
var name,
counter = -1;

function remover(){
    items.forEach(function(item){
        itemPanel.removeChild(document.getElementById(item));
        items.splice(items.indexOf(item), 1);
    });
}
function adder(){
    name = document.getElementById('item-name').value;
    if(name){
        document.getElementById('item-name').value = "";
        div = document.createElement('div');
        div.textContent = name;
        div.setAttribute('class', 'custom-div');
        div.setAttribute('onclick', 'clicked(this.id)');
        div.setAttribute('id', setId());
        itemPanel.appendChild(div);
    }
}

// Just for the sake of unit testing
function setId(){
    return ++counter;
}

function clicked(id){
    var index = items.indexOf(id);
    if(index<0){
        document.getElementById(id).style.backgroundColor = "gray";
        items.push(id);
    }else{
        document.getElementById(id).style.backgroundColor = "darkgray";
        items.splice(index, 1);
    }
}
function test(number){
    return number>0? true: false;
}

this.module.exports = {test, clicked, adder, remover};