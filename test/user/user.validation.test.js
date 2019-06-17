const assert = require('assert');
const User = require('../../src/models/db/User');

describe('validate user', () => {

    it('Require user certificate', () => {
        const user = new User({
            certificate: undefined
        });

        // ValidateSync validates the request to the database and returns an error when it fails.
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.certificate;

        assert(message === 'Certificate is required.');
    });

    it('Require user certificate longer than 1024 characters', () => {
        const user = new User({
            certificate: 'A'
        });

        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.certificate;

        assert(message === 'Certificate must be longer than 1024 characters.');
    });
});