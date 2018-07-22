'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');


const {
    app,
    runServer,
    closeServer
} = require('../server');
const {
    User
} = require('../users');
const {
    Item
} = require('../items');
const {
    JWT_SECRET,
    TEST_DATABASE_URL
} = require('../config');

const expect = chai.expect;


chai.use(chaiHttp);

//checks for apps index page

describe("open index page", function () {
    it("should exist", function () {
        return chai
            .request(app)
            .get("/")
            .then(function (res) {
                expect(res).to.have.status(200);
            })
            .catch(err => {
                if (err instanceof chai.AssertionError) {
                    throw err;
                }

                const res = err.response;
                expect(res).to.have.status(400);
            });
    });
});




describe('/get all items', () => {
    const username = 'gbarkin';
    const password = 'password12345';
    const firstName = 'george';
    const lastName = 'barkin';

    before(function () {
        return runServer(TEST_DATABASE_URL);

    });


    after(function () {
        return closeServer();
    });

    it('Should send all items', function () {
        const token = jwt.sign({
                user: {
                    username,
                    firstName,
                    lastName
                }
            },
            JWT_SECRET, {
                algorithm: 'HS256',
                subject: username,
                expiresIn: '7d'
            }
        );

        return chai
            .request(app)
            .get('/api/items')
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
            });
    });


    it('post new item', function () {
        const token = jwt.sign({
                user: {
                    username,
                    firstName,
                    lastName
                }
            },
            JWT_SECRET, {
                algorithm: 'HS256',
                subject: username,
                expiresIn: '7d'
            }
        );

        return chai
            .request(app)
            .post('/api/items/add')
            .send({
                itemName: 'Test item',
                fee: '100'
            })
            .set('authorization', `Bearer ${token}`)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
            });
    });


});