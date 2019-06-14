const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

const UserSchema = new Schema({

    certificate: {
        type: String,
        required: [true, 'Certificate is required.'],
        validate: {
            validator: (s) => s.length > 1024,
            message: 'Certificate must be longer than 1024 characters.'
        }
    },

    name: {
        type: String,
        validate: {
            validator: (s) => s.length > 2,
            message: 'The name must be longer than 2 characters.'
        }
    },

    nameHash: {
        type: String,
        validate: {
            validator: (s) => s.length > 8,
            message: 'The hash must be longer than 8 characters.'
        }
    },

    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);