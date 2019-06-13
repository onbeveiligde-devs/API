// const User = require('../models/db/User');
const Hal = require('hal');

module.exports = {
    NotImplemented: function (req, res) {
        res.status(501);
        res.send(new Hal.Resource({
            message: 'Not Implemented',
            code: 501
        }, req.url));
    },

    ExpectationFailed: function (req, res) {
        res.status(417);
        res.send(new Hal.Resource({
            message: 'Expectation Failed',
            code: 417
        }, req.url));
    },

    NotFound: function (req, res) {
        res.status(404);
        res.send(new Hal.Resource({
            message: 'Not Found',
            status: 404
        }, req.url));
    }
};