process.env.NODE_ENV = 'test';
let ids = new Array(),
app = require('../app'),
mocha = require('mocha'),
chai = require('chai'),
should = chai.should(),
chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

describe('Item tests', () => {

    beforeEach(next => {
        chai.request(app).delete('/item/clear')
        .end((err,res) => {
            res.should.have.status(200);
        });
        next();
    });

    describe('/GET Item', () => {

        it('GET should get all items', next => {
            chai.request(app).get('/item')
            .set('Cookie','userid=1')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            });
            next();
        });

    });

    describe('/ POST Item', () => {
        it('POST should insert given item', next => {
            chai.request(app).post('/item')
            .set('Cookie','userid=1')
            .send({name:'Test', userid:1})
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                ids.push(res.body.id);
            });
            next();
        });
    });

    describe('/ DELETE Item', () => {
        it('DELETE should remove the item', next => {
            chai.request(app).delete('/item')
            .set('Cookie','userid=1')
            .send(ids)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('n').eql(ids.length);
            });
            next();
        });
    });

});

describe('User tests', () => {
    let user = [null, 'name', 'username', 'password','uname@dom.tld','0123456789','address'];
    describe('/user/ POST Inserts Users', () => {
        it('it should insert if no duplicated found', next => {
            chai.request(app).post('/user')
            .send(user)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
            });
            next();
        });
        it('it should fail when duplicate entering', next => {
            chai.request(app).post('/user')
            .send(user)
            .end((err,res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('key');
            });
            next();
        });
    });
    describe('/user/validate POST validate users', () => {

    });
});