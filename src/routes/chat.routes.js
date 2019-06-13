const controller = require('../controllers/chat.controller');

module.exports = (app) => {
    app.get('/chat', controller.list);
    app.get('/chat/:id', controller.get);
    app.post('/chat', controller.create);
};