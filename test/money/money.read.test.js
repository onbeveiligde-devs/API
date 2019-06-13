const assert = require('assert');
const Money = require('../../src/models/db/Money');

describe('Read messages out of database', () => {
    let money;

    beforeEach((done) => {
        money = new Money({
            certificateSubject: 'Read Certificate Test',
            certificateAuthor: 'Read Certificate TestAuthor',
            messageHash: 'Hash for the message for the read tests',
            message: 'Message for the read tests'
        });
        money.save().then(() => {
            done();
        });
    });

    it('finds all messages with a certificate of money', (done) => {
        // console.log("finds all messages with a certificate of money");
        Money.find({
            certificateSubject: 'Read Certificate Test'
        }).then((messages) => {
            // console.log('messages found:', messages);
            // console.log('looking for:', money);
            assert(messages.length === 1);
            done();
        });
    });

    it('find the money with the id', (done) => {
        // console.log("find the money with the id");
        Money.find({
            certificateSubject: 'Read Certificate Test'
        }).then((messages) => {
            // console.log('messages found:', messages);
            // console.log('looking for:', money);
            assert(messages[0]._id.toString() === money._id.toString());
            done();
        });
    });

    it('find the money with the certificate', (done) => {
        // console.log("find the money with the certificate");
        Money.findOne({
            certificateSubject: 'Read Certificate Test'
        }).then((moneyPromise) => {
            // console.log('money found:', money);
            assert(moneyPromise.certificateSubject === money.certificateSubject);
            done();
        });
    });
});