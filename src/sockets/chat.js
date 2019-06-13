const socketio = require('socket.io');
const {
    save,
    load
} = require('../models/msg');

module.exports = {
    start: function (app) {
        const io = socketio(app); // setup stream socket

        // socket connection
        io.on('connection', function (socket) { // connected with socket
            module.exports.hello(socket, io);
            module.exports.message(socket, io);
        });
    },

    hello: function (socket, io) {
        // console.log('socket id: ', socket.id) // connected with client
        let address = socket.handshake.address;
        console.log('New connection from ' + address + '. Browser: ', socket.handshake.headers['user-agent']);
        io.emit('NEWCONNECTION', address); // send to client
    },

    message: function (socket, io) {
        socket.on('MSGTOSERV', function (data) { // received from client
            console.log('try to save message from ' + socket.handshake.address);
            const user = new User(data);
            user.save()
                .then((reply) => {
                    console.log('message saved from ' + socket.handshake.address + '. Try to load it...');
                    io.emit('MSGTOCLIENT', reply); // send to client
                    console.log('message loaded and send to ' + socket.handshake.address);
                })
                .catch(err => {
                    console.log('can not create user for ' + socket.handshake.address, err);
                    io.emit('MSGTOCLIENT', err); // send to client
                });
        });
    }
}