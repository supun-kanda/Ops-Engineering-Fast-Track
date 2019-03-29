# Ops-Engineering-Fast-Track
All new employees assigned to Ops-Engineering team are encouraged to complete the tasks mentioned in this document and do a proper code-review before starting work in Ops-Engineering projects

# Initiate Repository

#### Git commands for branching are as follows
- Create a branch
```
git branch milestone
```
- Move to the branch
```
git checkout milestone
```
- Or moving can be done while creating
```
git checkout -b milestone
```
- Available branches
```
git branch
```
- Changes made in the branch
```
git status
```
- Commits on the branch
```
git log
```
- Add changes to next commit
```
git add README.md
```
- Commit the changes made
```
git commit -m 'description'
```
- Or both adding and commiting can be done once
```
git commit -a README.md -m 'description'
```
#### The Main Page
- The purpose of the main page is to show orders, purchases and the products of the sellers on the sellers perspective. On the Sellers perspective it's the page which shows the cutomer orders and the order which you have shipped.
- Initially the main page is only handled by browser. The data is only kept into the document which meaning reloading the document will bring the document to the initial stage. On the initial task the app is look like this.

![alt text](https://i.ibb.co/89FZ2gT/Screenshot-from-2019-03-29-15-52-09.png)

- There is no proper styling and no functions atm because the styling can be done using future tasks. The items are kept in the memory using arrays. Here are the functions ```adder``` and ```remover``` executes by clicking button *Add Item* and *Remove Item* respectively. Adder adds a new division to the html while remover removes the elements ids which contains in ```items``` array
```
const itemPanel = document.getElementById('form'),
items = new Array();
var name,
counter = 0;

function remove(){with 
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
```
- The added items should be selected before remove it. When the item is clicked, the function ```clicked``` executes.
```
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

```
