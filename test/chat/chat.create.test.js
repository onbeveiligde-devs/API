const assert = require('assert');
const Chat = require('../../src/models/db/Chat');
const User = require('../../src/models/db/User')

describe('Create a chat', () => {

    it('Saves a chat', (done) => {
        
        const chat = new Chat({
            certificateSubject: 'Subject Certificate',
            certificateAuthor: 'Certificate Author',
            messageHash: 'Hash for the message',
            message: 'Test message'
        });

        
        chat.save().then(() => {
            
            assert(!chat.isNew);
            done();
        });
    });
});