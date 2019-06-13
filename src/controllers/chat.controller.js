const Chat = require('../models/db/Chat');
const Hal = require('hal');

module.exports = {
    list: function (req, res) {
        console.log('try to get a list of messages. ');

        Chat.find()
            .then(messages => {
                let resource = new Hal.Resource({
                    "messages": messages
                }, req.url);

                messages.forEach(chat => {
                    let str = req.url;
                    if (str.substr(-1) != '/') str += '/';
                    str += chat._id;
                    resource.link(chat.subject, str);
                });

                res.send(resource);
            })
            .catch(err => {
                console.log('can not get a list of messages. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get a list of messages.',
                    errors: err
                }, req.url));
            });
    },

    create: function (req, res) {
        console.log('try to add a chat message. ', req.body);

        const chat = new Chat(req.body);
        chat.save()
            .then((reply) => {
                let resource = new Hal.Resource({
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
    },

    get: function (req, res) {
        console.log('try to get chat. ', req.params);

        Chat.findOne({
                _id: req.params.id
            })
            .then(reply => {
                res.send(new Hal.Resource({
                    Chat: reply._doc
                }, req.url));
            })
            .catch(err => {
                console.log('can not get chat. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get chat.',
                    errors: err
                }, req.url));
            });
    }
};