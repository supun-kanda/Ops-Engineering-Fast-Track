const assert = require('chai').assert;
const test = require('../public/main').test;


describe('App',function(){
    var type = typeof(test);
    it('Test should be a function', function(){
        assert.isFunction(test);
    });
    it('The number should not be negative', function(){
        assert.equal(test(-1), false);
        //assert.equal(test(1), true);
    });
    it('The number should be positive', function(){
        //assert.equal(test(-1), false);
        assert.equal(test(+1), true);
    });
});