// import libs
const mongoose = require('mongoose');

// use IS6 implementasion for Prommises
mongoose.Promise = global.Promise;

before((done) => {
    // connect to mongodb
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    mongoose.connection
        .once('open', () => {
            console.log('Connected to MongoDB', process.env.DB);
            done();
        })
        .on('error', (error) => {
            console.log('Error: ', 'Can not connect to MongoDB.');
            console.log('Error: ', error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        mongoose.connection.collections.chats.drop(() => {
             mongoose.connection.collections.logs.drop(() => {
                 done();
                 //mongoose.connection.collections.moneys.drop(() => {
                   //  done();
                 //});
             });
        });
    });
});