const assert = require('assert');
const Chat = require('../../src/models/db/Chat');

describe('Read messages out of database', () => {
    let chat;

    beforeEach((done) => {
        chat = new Chat({
            certificateSubject: 'Read Certificate Test',
            certificateAuthor: 'Read Certificate TestAuthor',
            messageHash: 'Hash for the message for the read tests',
            message: 'Message for the read tests'
        });
        chat.save().then(() => {
            done();
        });
    });

    it('finds all messages with a certificate of chat', (done) => {
        // console.log("finds all messages with a certificate of chat");
        Chat.find({
            certificateSubject: 'Read Certificate Test'
        }).then((messages) => {
            // console.log('messages found:', messages);
            // console.log('looking for:', chat);
            assert(messages.length === 1);
            done();
        });
    });

    it('find the chat with the id', (done) => {
        // console.log("find the chat with the id");
        Chat.find({
            certificateSubject: 'Read Certificate Test'
        }).then((messages) => {
            // console.log('messages found:', messages);
            // console.log('looking for:', chat);
            assert(messages[0]._id.toString() === chat._id.toString());
            done();
        });
    });

    it('find the chat with the certificate', (done) => {
        // console.log("find the chat with the certificate");
        Chat.findOne({
            certificateSubject: 'Read Certificate Test'
        }).then((chatPromise) => {
            // console.log('chat found:', chat);
            assert(chatPromise.certificateSubject === chat.certificateSubject);
            done();
        });
    });
});