const User = require('../models/db/User');
const Hal = require('hal');
const Log = require('../models/Log');

module.exports = {
    list: function (req, res) {
        console.log('try to get a list of users. ');

        User.find()
            .then(users => {
                let resource = new Hal.Resource({
                    "users": users
                }, req.url);

                users.forEach(user => {
                    let str = req.url;
                    if (str.substr(-1) != '/') str += '/';
                    str += user._id;
                    resource.link(user._id, str);
                });

                res.send(resource);
            })
            .catch(err => {
                console.log('can not get a list of users. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get a list of users.',
                    errors: err
                }, req.url));
            });
    },

    create: function (req, res) {
        console.log('try to create a user. ', req.body);

        const user = new User(req.body);
        user.save()
            .then((reply) => {
                let resource = new Hal.Resource({
                    created: !user.isNew,
                    data: reply._doc
                }, req.url);

                let str = req.url;
                if (str.substr(-1) != '/') str += '/';
                str += user._id;
                resource.link(user._id, str);

                res.send(resource);

                Log.save(req.body.certificate, "IS CREATED", req.body.nameHash)
            })
            .catch(err => {
                console.log('can not create user. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not create user.',
                    errors: err
                }, req.url));
            });
    },

    get: function (req, res) {
        console.log('try to get user. ', req.params);

        User.findOne({
                _id: req.params.id
            })
            .then(reply => {
                res.send(new Hal.Resource({
                    User: reply._doc
                }, req.url));
            })
            .catch(err => {
                console.log('can not get user. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get user.',
                    errors: err
                }, req.url));
            });
    }
};