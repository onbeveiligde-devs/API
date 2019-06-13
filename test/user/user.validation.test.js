const assert = require('assert');
const User = require('../../src/models/db/User');

describe('validate user', () => {
    it('require user certificate', () => {
        const user = new User({
            certificate: undefined
        });

        // validateSync() returns a validation result, instendly. 
        // use validate() with a calback function to validate longer proceses (database stuff) 
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.certificate;

        // console.log(message);
        assert(message === 'Certificate is required.');
    });

    it('require user certificate longer than 1024 characters', () => {
        const user = new User({
            certificate: 'A'
        });

        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.certificate;

        assert(message === 'Certificate must be longer than 1024 characters.');
    });

    // it('Do NOT allow invalid records being saved', (done) => {
    //     const user = new User({
    //         certificate: 'Al'
    //     });

    //     user.save().catch((validationResult) => {
    //         const {
    //             message
    //         } = validationResult.errors.certificate;

    //         // console.log(message);
    //         assert(message === 'certificate is invalid.');
    //         done();
    //     });
    // });
});