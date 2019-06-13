const assert = require('assert');
const Chat = require('../../src/models/db/Chat');
const User = require('../../src/models/db/User')

describe('Create a chat', () => {

    it('saves a chat', (done) => {
        // devine
        // create a new chat
        // console.log("devine new chat");
        const chat = new Chat({
            certificateSubject: 'Subject Certificate',
            certificateAuthor: 'Certificate Author',
            messageHash: 'Hash for the message',
            message: 'Test message'
        });

        // save (with prommeses)
        // save the chat into the database
        // console.log("save chat: ", chat.certificate);
        chat.save().then(() => {
            // verify
            // is the model saved in the database?
            // console.log("verify chat: ", chat.certificate);
            assert(!chat.isNew); // is not new anymore becoase he is saved in the database
            done();
        });
    });
});