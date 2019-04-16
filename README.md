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

- **Branch Name** : ```task/OE-4178-basic-FE```
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
}
```
- The added items should be selected before remove it. When the item is clicked, the function ```clicked``` executes.
```
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

- With the help of express this same page can be served through a server. And also the values are stored in backend rather than process all in frontend. So with this upgrade, the values will be kept even after refreshing the page because it fetches data through the server.
- **Branch Name** : ```task/OE-4248-implementing-bff```
- At this point, database is not still implemented so a simple object is held in server which replicates a databse.
- Every database related operation is named under the route ``/db``. An array called ``DB`` is an array which replicates a DB for now. 

```
const DB = new Array();
var varID = 0;
var express = require('express');
var router = express.Router();

function respond(req, res){ //Respond json objects as strings
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
}
```
- Get request along the route is programmed for respond the whole array.
- Post request creates an object with the name and unique id and pushes to ``DB``.
- Delete request removes the object for the given id and respond success.
```
router.get('/', (req,res) => respond.call(DB,req,res));

router.post('/', function(req, res) {
    //DB[req.body.id] = req.body;
    DB.push({id:varID, name:req.body.name});
    respond.call({id:varID},req,res);
    varID++;
});

router.delete('/',(req,res) => {
    DB.forEach(item => {
        if(req.body.includes(item.id.toString())){
            DB.splice(DB.indexOf(item),1);
        }
    });
    res.status(200);
    res.end(); //Learn this
});
```

- **Branch Name** : ```milestone/OE-4144-Supun```
The routes following are the all routes presented in the app

- ```/``` GET redirect to \sign\in  
- ```/sign/in``` GET get sign in page
- ```/sign/up``` GET get sign up page
- ```/sign/out``` GET clear the cookie userid
- ```/user/validate``` POST validate user credentials
- ```/user/``` POST insert body details for user 
- ```/main/:username``` GET redirect to main page
- ```/item/``` GET get all items for cookie userid
- ```/item/``` POST insert item details in db
- ```/item/``` DELETE delete the item given by id
