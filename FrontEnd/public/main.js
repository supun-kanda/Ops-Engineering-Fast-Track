var selector = document.getElementById('selector');
var name = document.getElementById('item-name').value;
var textItem = document.getElementById('item1');
var itemPanel = document.getElementById('form');
const items = new Array();
var name;
var counter = 0;

function remove(){
    items.forEach(function(item){
        itemPanel.removeChild(document.getElementById(item));
        //console.log(items.splice(items.indexOf(item), 1));
        items.splice(items.indexOf(item), 1);
    });
}
function adder(){
    name = document.getElementById('item-name').value;
    document.getElementById('item-name').value = "";
    if(name){
        //console.log("Adder Called",name);
        div = document.createElement('div');
        div.textContent = name;
        div.setAttribute('class', 'custom-div');
        div.setAttribute('onclick', 'clicked(this.id)');
        div.setAttribute('id', counter.toString());
        document.getElementById('form').appendChild(div);
        counter ++;
    }
}
function clicked(id){
    var index = items.indexOf(id);
    if(index<0){
        document.getElementById(id).style.backgroundColor = "gray";
        items.push(id);
        //console.log('%s:Add',id);
    }else{
        document.getElementById(id).style.backgroundColor = "darkgray";
        items.splice(index, 1);
        //console.log('%s:Del',id);
    }
}