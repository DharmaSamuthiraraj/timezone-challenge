'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

describe('GET users profile with query param', () => {
    it('it should GET user profile for profile name "dharma-samuthiraraj" ', (done) => {
      chai.request(server)
          .get('/api/users?name=dharma-samuthiraraj')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');                
              res.body.should.have.property('name').eql('Dharmendran Samuthiraraj');
              res.body.should.have.property('headline'); 
              res.body.should.have.property('location');   
              res.body.should.have.property('timeZone');                    
            done();
          });
    }).timeout(30000);
  });

describe('GET users profile with param', () => {
    it('it should GET user profile for profile name "murali-vivekanandan-536a" ', (done) => {
      chai.request(server)
          .get('/api/users/murali-vivekanandan-536a')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');                
              res.body.should.have.property('name').eql('Murali Vivekanandan');
              res.body.should.have.property('headline'); 
              res.body.should.have.property('location');   
              res.body.should.have.property('timeZone');                 
            done();
          });
    }).timeout(30000);
  });

describe('GET no results for non-profile name', () => {
    it('it should get ZERO_RESULTS status for name "abc" ', (done) => {
      chai.request(server)
          .get('/api/users?name=abc')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status').eql('ZERO_RESULTS');     
              res.body.should.have.property('message').eql('No results found');                 
            done();
          });
    }).timeout(20000);
});

describe('GET invalid request status', () => {
    it('it should get invalid request for no param', (done) => {
      chai.request(server)
          .get('/api/users')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('INVALID_REQUEST');
              res.body.should.have.property('errorMessage');                
            done();
          });
    })
});

describe('GET invalid request status for param name with empty string', () => {
    it('it should get invalid request for param name with empty string', (done) => {
      chai.request(server)
          .get('/api/users?name=')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('INVALID_REQUEST');
              res.body.should.have.property('errorMessage');                
            done();
          });
    })
});

