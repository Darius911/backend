const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { signup } = require('../controlers/authControler');
const argon2 = require('argon2');
const { sign } = require('node:crypto');
const { log } = require('node:console');
 
describe('Auth Controller - signup', () => {
  let sandbox;
  let createUserStub;
  let signTokenStub;
  let sendTokenCookieStub;
  let req;
  let res;
  let next;
 
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    createUserStub = sandbox.stub(require('../models/userModel'), 'createUser');
 
    signTokenStub = sandbox.stub(jwt, 'sign');
 
    sendTokenCookieStub = sandbox.stub(
      require('../controlers/authControler'),
      'sendCookie'
    );
 
    req = {
      body: {
        username: 'test',
        email: 'lN8Gw@example.com',
        password: 'password123',
      },
    };
    res = {
      status: sandbox.stub().returnsThis(),
      json: sandbox.stub().returnsThis(),
      cookie: sandbox.stub(),
    };
    next = sandbox.stub();
  });
 
  afterEach(() => {
    createUserStub.restore();
    signTokenStub.restore();
    sendTokenCookieStub.restore();
  });
 
  it('should create a new user and return a token', async () => {
    const hashedPassword = await argon2.hash(req.body.password);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'user',
    };
 
    const token = 'fake-token';
 
    createUserStub.resolves(newUser);
    signTokenStub.returns(token);
    sendTokenCookieStub.callsFake((token, res) => {
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
    });
 
    await signup(req, res, next);
 
    console.log(res.json.args);
    console.log(res.cookie.args);
   
   
 
 
  });
});