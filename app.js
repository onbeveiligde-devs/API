// require('dotenv').config({path: 'process.env'});
const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cross = require('cors');
const mongoose = require('mongoose');

// make mongoose use ES6 promises
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connect(process.env.DB, {
    useNewUrlParser: true
});

// app
const app = express(); // takes incoming requests and handles them
app.use(bodyParser.json({ // tell app to use json body parser
    extended: true
}));
// app.use(cookieParser());
app.use(cross()); // Allow Cross Domain Requests

// endpoints
const defaultRoutes = require('./src/routes/default.routes');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const chatRoutes = require('./src/routes/chat.routes');
const logRoutes = require('./src/routes/log.routes');

logRoutes(app);
chatRoutes(app);
authRoutes(app);
userRoutes(app);
defaultRoutes(app);

// server
const port = process.env.PORT | 3000;
const server = app.listen(port, function () {
    console.log('server running on port ' + port);
});

// sockets
const sockets = require('./src/sockets/chat');
sockets.start(server);

module.exports = {
    app: app,
    server: server
}

