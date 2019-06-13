const controller = require('../controllers/log.controller');

module.exports = (app) => {
    app.get('/log', controller.list);
    app.get('/log/:id', controller.get);
    app.post('/log', controller.create);
};