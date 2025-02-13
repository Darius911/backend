const {describe, it, beforeEach, afterEach} = require('node:test')
const assert = require('node:assert');
const sinom = require('sinon');
const {sql} = require('../dbConnection');
const {createUser} = require('../models/userModel');
describe('User Model', () => {
    let sandbox;
    let sqlStub;

    beforeEach(() => {
        sandbox = sinom.createSandbox();
         sqlStub = sandbox.stub(sql, 'call');

    });
    afterEach(() => {
        sandbox.restore();
    });

    describe('createUser', () => { 
        it('should create a new user and return created user', async () => {
           const newUser ={
                username: 'userModelTest',
                email: 'userModelTest@gmail.com',
                password: 'passpass',
            }

            sqlStub.resolves([{
                username: 'userModelTest',
                email: 'userModelTest@gmail.com',
                password: 'passpass'
            }])

            const user = await createUser(newUser);

            assert.strictEqual(user.username, newUser.username);
            assert.strictEqual(user.email, newUser.email);
        });
});
});