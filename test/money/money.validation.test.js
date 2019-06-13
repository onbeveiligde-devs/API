const assert = require('assert');
const Money = require('../../src/models/db/Money');

describe('validate money', () => {
    it('require money certificate', () => {
        const money = new Money({
            certificateSubject: undefined,
            certificateAuthor: undefined,
            messageHash: 'Test hash',
            message: 'Test message'
        });

        // validateSync() returns a validation result, instendly. 
        // use validate() with a calback function to validate longer proceses (database stuff) 
        const validationResult = money.validateSync();
        // // console.log('requere money certificate', validationResult);
        const {
            message
        } = validationResult.errors.certificateSubject;

        // console.log(message);
        assert(message === 'Subject certificate is required.');
    });

    it('require money certificate longer than 1024 characters', () => {
        const money = new Money({
            certificateSubject: 'A',
            certificateAuthor: 'TestAuthor',
            messageHash: 'Test hash',
            message: 'Test message'
        });

        const validationResult = money.validateSync()
        // // console.log('requere money certificate longer than 2 characters', validationResult);
        const {
            message
        } = validationResult.errors.certificateSubject;

        // console.log(message);
        assert(message === 'Certificate must be longer than 1024 characters.');
    });

    // it('Do NOT allow invalid records being saved', (done) => {
    //     const money = new Money({
    //         certificate: 'Al'
    //     });

    //     money.save().catch((validationResult) => {
    //         const {
    //             message
    //         } = validationResult.errors.certificate;

    //         // console.log(message);
    //         assert(message === 'Certificate must be longer than 1024 characters.');
    //         done();
    //     });
    // });
});