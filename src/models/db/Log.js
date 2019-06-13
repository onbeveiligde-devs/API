const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

const LogSchema = new Schema({

    certificate: {
        type: String,
        required: [true, 'Certificate is required.'],
        validate: {
            validator: (s) => s.length >= 1024,
            message: 'Certificate must be 1024 characters or longer.'
        }
    },

    data: {
        required: [true, "Data is required."],
        type: String,
    },

    hash: {
        type: String,
        required: [true, 'The encrypted hash is required.'],
        validate: {
            validator: (s) => s.length >= 64,
            message: 'Hash must be 64 characters or longer'
        }
    },

    timestamp: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Log', LogSchema);