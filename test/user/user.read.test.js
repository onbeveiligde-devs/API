const assert = require('assert');
const User = require('../../src/models/db/User');

describe('Read users out of database', () => {
    let holland;

    beforeEach((done) => {
        holland = new User({
            certificate: 'holland'
        });
        holland.save().then(() => {
            done();
        });
    });

    it('finds all users with a certificate of holland', (done) => {
        // console.log("finds all users with a certificate of holland");
        User.find({
            certificate: 'holland'
        }).then((users) => {
            // console.log('users found:', users);
            // console.log('looking for:', holland);
            assert(users.length === 1);
            done();
        });
    });

    it('find the user with the id', (done) => {
        // console.log("find the user with the id");
        User.find({
            certificate: 'holland'
        }).then((users) => {
            // console.log('users found:', users);
            // console.log('looking for:', holland);
            assert(users[0]._id.toString() === holland._id.toString());
            done();
        });
    });

    it('find the user with the certificate', (done) => {
        // console.log("find the user with the certificate");
        User.findOne({
            certificate: 'holland'
        }).then((user) => {
            // console.log('user found:', user);
            assert(user.certificate === holland.certificate);
            done();
        });
    });
});