const controller = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/private', controller.private);
    app.post('/public', controller.public);
    app.post('/hash', controller.hash);
    app.post('/verify', controller.verify);
};