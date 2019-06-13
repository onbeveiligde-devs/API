const Log = require('../models/db/Log');
const Hal = require('hal');

module.exports = {
    list: function (req, res) {
        console.log('try to get a list of logs. ');

        Log.find()
            .then(logs => {
                let resource = new Hal.Resource({
                    "logs": logs
                }, req.url);

                logs.forEach(log => {
                    let str = req.url;
                    if (str.substr(-1) != '/') str += '/';
                    str += log._id;
                    resource.link(log._id, str);
                });

                res.send(resource);
            })
            .catch(err => {
                console.log('can not get a list of logs. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get a list of logs.',
                    errors: err
                }, req.url));
            });
    },

    create: function (req, res) {
        console.log('try to create a log. ', req.body);

        const log = new Log(req.body);
        log.save()
            .then((reply) => {
                let resource = new Hal.Resource({
                    created: !log.isNew,
                    data: reply._doc
                }, req.url);

                let str = req.url;
                if (str.substr(-1) != '/') str += '/';
                str += log._id;
                resource.link(log._id, str);

                res.send(resource);
            })
            .catch(err => {
                console.log('can not create log. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not create log.',
                    errors: err
                }, req.url));
            });
    },

    get: function (req, res) {
        console.log('try to get log. ', req.params);

        Log.findOne({
                _id: req.params.id
            })
            .then(reply => {
                res.send(new Hal.Resource({
                    Log: reply._doc
                }, req.url));
            })
            .catch(err => {
                console.log('can not get log. ', err);
                res.status(200);
                res.send(new Hal.Resource({
                    message: 'can not get log.',
                    errors: err
                }, req.url));
            });
    }
};