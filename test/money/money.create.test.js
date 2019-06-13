const assert = require('assert');
const Money = require('../../src/models/db/Money');
const User = require('../../src/models/db/User')

describe('Create a money', () => {

    it('saves a money', (done) => {
        // devine
        // create a new money
        // console.log("devine new money");
        const money = new Money({
            certificateSubject: 'Subject Certificate',
            certificateAuthor: 'Certificate Author',
            messageHash: 'Hash for the message',
            message: 'Test message'
        });

        // save (with prommeses)
        // save the money into the database
        // console.log("save money: ", money.certificate);
        money.save().then(() => {
            // verify
            // is the model saved in the database?
            // console.log("verify money: ", money.certificate);
            assert(!money.isNew); // is not new anymore becoase he is saved in the database
            done();
        });
    });
});