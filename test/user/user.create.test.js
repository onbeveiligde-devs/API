const assert = require('assert');
const User = require('../../src/models/db/User');

describe('Create a user', () => {
    it('saves a user', (done) => {
        // devine
        // create a new user
        // console.log("devine new user");
        const holland = new User({
            certificate: 'holland'
        });

        // save (with prommeses)
        // save the user into the database
        // console.log("save user: ", holland.certificate);
        holland.save().then(() => {
            // verify
            // is the model saved in the database?
            // console.log("verify user: ", holland.certificate);
            assert(!holland.isNew); // is not new anymore becoase he is saved in the database
            done();
        });
    });
});