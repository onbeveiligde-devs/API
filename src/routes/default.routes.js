const defaultController = require('../controllers/default.controller');
const httpController = require('../controllers/http.controller');

module.exports = (app) => {
    app.all('/', defaultController.index);
    app.all('*', httpController.NotFound);
};
