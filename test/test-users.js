// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const { app, runServer, closeServer } = require('../server');
// const { User } = require('../users');
// const { TEST_DATABASE_URL } = require('../config');

// const expect = chai.expect;

// // This let's us make HTTP requests
// // in our tests.
// // see: https://github.com/chaijs/chai-http
// chai.use(chaiHttp);

// describe('/api/user', function () {
//   const username = 'exampleUser';
//   const password = 'examplePass';
//   const firstName = 'Example';
//   const lastName = 'User';
//   const usernameB = 'exampleUserB';
//   const passwordB = 'examplePassB';
//   const firstNameB = 'ExampleB';
//   const lastNameB = 'UserB';

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//   beforeEach(function () { });

//   afterEach(function () {
//     return User.remove({});
//   });

//   describe('/api/users', function () {
//     describe('POST', function () {
//       it('reject users with missing username', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             password,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal('Missing field');
//             expect(res.body.location).to.equal('username');
//           });
//       });
//       it('reject login attempt with missing password', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal('Missing field');
//             expect(res.body.location).to.equal('password');
//           });
//       });
//       it('Should reject users with non-string username', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username: 1234,
//             password,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Incorrect field type: expected string'
//             );
//             expect(res.body.location).to.equal('username');
//           });
//       });
//       it('Should reject users with non-string password', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password: 1234,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Incorrect field type: expected string'
//             );
//             expect(res.body.location).to.equal('password');
//           });
//       });
//       it('Should reject users with non-string first name', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password,
//             firstName: 1234,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Incorrect field type: expected string'
//             );
//             expect(res.body.location).to.equal('firstName');
//           });
//       });
//       it('Should reject users with non-string last name', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password,
//             firstName,
//             lastName: 1234
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Incorrect field type: expected string'
//             );
//             expect(res.body.location).to.equal('lastName');
//           });
//       });
//       it('Should reject users with non-trimmed username', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username: ` ${username} `,
//             password,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Cannot start or end with whitespace'
//             );
//             expect(res.body.location).to.equal('username');
//           });
//       });
//       it('Should reject users with non-trimmed password', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password: ` ${password} `,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Cannot start or end with whitespace'
//             );
//             expect(res.body.location).to.equal('password');
//           });
//       });
//       it('Should reject users with empty username', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username: '',
//             password,
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Must be at least 1 characters long'
//             );
//             expect(res.body.location).to.equal('username');
//           });
//       });
//       it('Should reject users with password less than ten characters', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password: '123456789',
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Must be at least 10 characters long'
//             );
//             expect(res.body.location).to.equal('password');
//           });
//       });
//       it('Should reject users with password greater than 72 characters', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password: new Array(73).fill('a').join(''),
//             firstName,
//             lastName
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Must be at most 72 characters long'
//             );
//             expect(res.body.location).to.equal('password');
//           });
//       });
//       it('Should reject users with duplicate username', function () {
//         // Create an initial user
//         return User.create({
//           username,
//           password,
//           firstName,
//           lastName
//         })
//           .then(() =>
//             // Try to create a second user with the same username
//             chai.request(app).post('/api/users').send({
//               username,
//               password,
//               firstName,
//               lastName
//             })
//           )
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal(
//               'Username already taken'
//             );
//             expect(res.body.location).to.equal('username');
//           });
//       });
//       it('Should create a new user', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password,
//             firstName,
//             lastName
//           })
//           .then(res => {
//             expect(res).to.have.status(201);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.keys(
//               'username',
//               'firstName',
//               'lastName'
//             );
//             expect(res.body.username).to.equal(username);
//             expect(res.body.firstName).to.equal(firstName);
//             expect(res.body.lastName).to.equal(lastName);
//             return User.findOne({
//               username
//             });
//           })
//           .then(user => {
//             expect(user).to.not.be.null;
//             expect(user.firstName).to.equal(firstName);
//             expect(user.lastName).to.equal(lastName);
//             return user.validatePassword(password);
//           })
//           .then(passwordIsCorrect => {
//             expect(passwordIsCorrect).to.be.true;
//           });
//       });
//       it('Should trim firstName and lastName', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({
//             username,
//             password,
//             firstName: ` ${firstName} `,
//             lastName: ` ${lastName} `
//           })
//           .then(res => {
//             expect(res).to.have.status(201);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.keys(
//               'username',
//               'firstName',
//               'lastName'
//             );
//             expect(res.body.username).to.equal(username);
//             expect(res.body.firstName).to.equal(firstName);
//             expect(res.body.lastName).to.equal(lastName);
//             return User.findOne({
//               username
//             });
//           })
//           .then(user => {
//             expect(user).to.not.be.null;
//             expect(user.firstName).to.equal(firstName);
//             expect(user.lastName).to.equal(lastName);
//           });
//       });
//     });

//     describe('GET', function () {
//       it('Should return an empty array initially', function () {
//         return chai.request(app).get('/api/users').then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           expect(res.body).to.have.length(0);
//         });
//       });
//       it('Should return an array of users', function () {
//         return User.create(
//           {
//             username,
//             password,
//             firstName,
//             lastName
//           },
//           {
//             username: usernameB,
//             password: passwordB,
//             firstName: firstNameB,
//             lastName: lastNameB
//           }
//         )
//           .then(() => chai.request(app).get('/api/users'))
//           .then(res => {
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('array');
//             expect(res.body).to.have.length(2);
//             expect(res.body[0]).to.deep.equal({
//               username,
//               firstName,
//               lastName
//             });
//             expect(res.body[1]).to.deep.equal({
//               username: usernameB,
//               firstName: firstNameB,
//               lastName: lastNameB
//             });
//           });
//       });
//     });
//   });
// });




// describe("open index page", function () {
//     const username = 'testUser';
//     const password = 'testPassword';
//     const firstName = 'Rick';
//     const lastName = 'Sanchez';

//     before(function () {
//         var token;
//         return runServer(TEST_DATABASE_URL)
//         .request(app)
//         .post('/api/auth/login')
//         .send({
//             userName: gbarkin,
//             password: password12345
//         })
//         .end(function(err, res) {
//             if (err) throw err;
//             token = { access_token: res.body.token }
//             done();

//     });

//     after(function () {
//         return closeServer();
//     });

//     beforeEach(function () {
//         return User.hashPassword(password).then(password =>
//             User.create({
//                 username,
//                 password,
//                 firstName,
//                 lastName
//             })
//         );
//     });

//     afterEach(function () {
//         return User.remove({});

//     });

//     it("should return items", function () {
//         return chai
//             .request(app)
//                 .get('/api/items')
//                 .query(token)
//             })
//             .then(function (res) {
//                 expect(res).to.have.status(200)
//             })
//             .catch(err => {
//                 if (err instanceof chai.AssertionError) {
//                     throw err;
//                 }

//                 const res = err.response;
//                 expect(res).to.have.status(400);
//             });
//     });



// });





// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const jwt = require('jsonwebtoken');

// const { app, runServer, closeServer } = require('../server');
// const { User } = require('../users');
// const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

// const expect = chai.expect;

// // This let's us make HTTP requests
// // in our tests.
// // see: https://github.com/chaijs/chai-http
// chai.use(chaiHttp);

// describe('Auth endpoints', function () {
//   const username = 'exampleUser';
//   const password = 'examplePass';
//   const firstName = 'Example';
//   const lastName = 'User';

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//   beforeEach(function () {
//     return User.hashPassword(password).then(password =>
//       User.create({
//         username,
//         password,
//         firstName,
//         lastName
//       })
//     );
//   });

//   afterEach(function () {
//     return User.remove({});
//   });

//   describe('/api/auth/login', function () {
//     it('Should reject requests with no credentials', function () {
//       return chai
//         .request(app)
//         .post('/api/auth/login')
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(400);
//         });
//     });

//     it('Should reject requests with incorrect usernames', function () {
//       return chai
//         .request(app)
//         .post('/api/auth/login')
//         .send({ username: 'wrongUsername', password })
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should reject requests with incorrect passwords', function () {
//       return chai
//         .request(app)
//         .post('/api/auth/login')
//         .send({ username, password: 'wrongPassword' })
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should return a valid auth token', function () {
//       return chai
//         .request(app)
//         .post('/api/auth/login')
//         .send({ username, password })
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           const token = res.body.authToken;
//           expect(token).to.be.a('string');
//           const payload = jwt.verify(token, JWT_SECRET, {
//             algorithm: ['HS256']
//           });
//           expect(payload.user).to.deep.equal({
//             username,
//             firstName,
//             lastName
//           });
//         });
//     });
//   });

//   describe('/api/auth/refresh', function () {
//     it('Should reject requests with no credentials', function () {
//       return chai
//         .request(app)
//         .post('/api/auth/refresh')
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should reject requests with an invalid token', function () {
//       const token = jwt.sign(
//         {
//           username,
//           firstName,
//           lastName
//         },
//         'wrongSecret',
//         {
//           algorithm: 'HS256',
//           expiresIn: '7d'
//         }
//       );

//       return chai
//         .request(app)
//         .post('/api/auth/refresh')
//         .set('Authorization', `Bearer ${token}`)
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should reject requests with an expired token', function () {
//       const token = jwt.sign(
//         {
//           user: {
//             username,
//             firstName,
//             lastName
//           },
//         },
//         JWT_SECRET,
//         {
//           algorithm: 'HS256',
//           subject: username,
//           expiresIn: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
//         }
//       );

//       return chai
//         .request(app)
//         .post('/api/auth/refresh')
//         .set('authorization', `Bearer ${token}`)
//         .then(() =>
//           expect.fail(null, null, 'Request should not succeed')
//         )
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(401);
//         });
//     });
//     it('Should return a valid auth token with a newer expiry date', function () {
//       const token = jwt.sign(
//         {
//           user: {
//             username,
//             firstName,
//             lastName
//           }
//         },
//         JWT_SECRET,
//         {
//           algorithm: 'HS256',
//           subject: username,
//           expiresIn: '7d'
//         }
//       );
//       const decoded = jwt.decode(token);

//       return chai
//         .request(app)
//         .post('/api/auth/refresh')
//         .set('authorization', `Bearer ${token}`)
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           const token = res.body.authToken;
//           expect(token).to.be.a('string');
//           const payload = jwt.verify(token, JWT_SECRET, {
//             algorithm: ['HS256']
//           });
//           expect(payload.user).to.deep.equal({
//             username,
//             firstName,
//             lastName
//           });
//           expect(payload.exp).to.be.at.least(decoded.exp);
//         });
//     });
//   });
// });
