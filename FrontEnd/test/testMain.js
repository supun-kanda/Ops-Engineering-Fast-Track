const chai = require('chai'),
assertArrays = require('chai-arrays'),
expect = chai.expect;
chai.use(assertArrays);
removeItems = new Array();
//const test = require('../public/main').test;

//all array should be empty after calling this method
function remover(){
    removeItems.forEach(function(item){
        //itemPanel.removeChild(document.getElementById(item));
    });
    removeItems.length = 0;
}
//clicked once add id to array and twice removes from the array
function clicked(id){
    var index = removeItems.indexOf(id);
    if(index<0){
        // document.getElementById(id).style.backgroundColor = "gray";
        removeItems.push(id);
    }else{
        // document.getElementById(id).style.backgroundColor = "darkgray";
        removeItems.splice(index, 1);
    }
}

describe('App',function(){
    var id1 = '1', id2 = '2', id3 = '3';
    
    it('ids should be added to the array', function(){
        clicked(id1);clicked(id2);clicked(id3);
        expect(removeItems).to.be.containingAllOf([id1, id2, id3]);
    });
    
    it('id should be removed from the array', function(){
        clicked(id1);
        expect(removeItems).not.to.be.containing(id1);
    });

    it('Array should be empty after calling remover', function(){
        remover();
        expect(removeItems).to.be.ofSize(0);
    });
});