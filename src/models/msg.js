const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');
const Chat = require('../models/db/Chat');

module.exports = {
    /**
     * @param msg = the chat message (unencrypted)
     * @param hash = the hash of the message. It is encrypted with the private key from the author
     * @param certificate = the certificate of the message author
     */
    save(msg, hash, certificate, done) {
        const chat = new Chat({
            certificateSubject: certificate,
            certificateAuthor: null,
            messageHash: hash,
            message: msg
        });
        chat.save()
            .then((reply) => {
                let resource = new Resource({
                    created: !chat.isNew,
                    data: reply._doc
                }, req.url);

                let str = req.url;
                if (str.substr(-1) != '/') str += '/';
                str += chat._id;
                resource.link(chat._id, str);

                res.send(resource);
            })
            .catch(err => {
                console.log('can not create chat. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not create chat.',
                    errors: err
                }, req.url));
            });
        done((true));
    },

    /** 
     * @param certificate = the certificate of the transparent person
     * @returns Array with the history of messages
     */
    load(certificate, done) {
        done([]);
    }
}