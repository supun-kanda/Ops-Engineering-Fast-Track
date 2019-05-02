var url = "http://localhost:2000";

function loadItems(){
    return new Promise((resolve,reject) => {
        fetch(url+"/item",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "GET"
        })
        .then(res => {
            if(res.status===200) 
                res.json()
                .then(data=>resolve(data))
                .catch(err=>reject(err));
            else 
                reject(new Error('Bad Response'));
        })
        .catch(err => reject(err))
    });
}

function addItem(itemObj){
    return new Promise((resolve,reject) => {
        fetch(url+"/item",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body:JSON.stringify({userid:itemObj.userid,name:itemObj.name})
        })
        .then(res => {
            if(res.status===200) 
                res.json()
                .then(data=>resolve(data))
                .catch(err=>reject(err));
            else 
                reject(new Error('Bad Response'));
        })
        .catch(err => reject(err))
    });
}

function deleteItems(removeItems){
    return (
        fetch(url+"/item",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body:JSON.stringify(removeItems)
        })
    );
}

module.exports = {loadItems,addItem,deleteItems};