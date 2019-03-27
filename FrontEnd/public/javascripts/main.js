const itemPanel = document.getElementById('form'),
removeItems = new Array();
var name,
counter = 0;

function remover(){
    removeItems.forEach(function(item){
        itemPanel.removeChild(document.getElementById(item));
    });
    removeItems.length = 0;
}
function adder(){
    name = document.getElementById('item-name').value;
    if(name){
        document.getElementById('item-name').value = "";
        div = document.createElement('div');
        div.textContent = name;
        div.setAttribute('class', 'custom-div');
        div.setAttribute('id', counter.toString());
        div.setAttribute('onclick', 'clicked(this.id)');
        itemPanel.appendChild(div);
        counter ++;
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
    console.log("Array is:",removeItems);
}