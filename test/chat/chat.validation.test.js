const assert = require('assert');
const Chat = require('../../src/models/db/Chat');

describe('validate chat', () => {
    it('require chat certificate', () => {
        const chat = new Chat({
            certificateSubject: undefined,
            certificateAuthor: undefined,
            messageHash: 'Test hash',
            message: 'Test message'
        });

        // validateSync() returns a validation result, instendly. 
        // use validate() with a calback function to validate longer proceses (database stuff) 
        const validationResult = chat.validateSync();
        // // console.log('requere chat certificate', validationResult);
        const {
            message
        } = validationResult.errors.certificateSubject;

        // console.log(message);
        assert(message === 'Subject certificate is required.');
    });

    it('require chat certificate longer than 1024 characters', () => {
        const chat = new Chat({
            certificateSubject: 'A',
            certificateAuthor: 'TestAuthor',
            messageHash: 'Test hash',
            message: 'Test message'
        });

        const validationResult = chat.validateSync()
        // // console.log('requere chat certificate longer than 2 characters', validationResult);
        const {
            message
        } = validationResult.errors.certificateSubject;

        // console.log(message);
        assert(message === 'Certificate must be longer than 1024 characters.');
    });

    // it('Do NOT allow invalid records being saved', (done) => {
    //     const chat = new Chat({
    //         certificate: 'Al'
    //     });

    //     chat.save().catch((validationResult) => {
    //         const {
    //             message
    //         } = validationResult.errors.certificate;

    //         // console.log(message);
    //         assert(message === 'Certificate must be longer than 1024 characters.');
    //         done();
    //     });
    // });
});