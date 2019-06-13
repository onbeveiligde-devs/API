const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

const ChatSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },

    certificateSubject: {
        type: String,
        unique: true,
        required: [true, 'Subject certificate is required.'],
        validate: {
            validator: (s) => s.length > 1,
            message: 'Certificate must be longer than 1024 characters.'
        }
    },

    certificateAuthor: {
        type: String,
        unique: true,
        required: [true, 'Author certificate is required.'],
        validate: {
            validator: (s) => s.length > 1,
            message: 'Certificate must be longer than 1024 characters.'
        }
    },

    messageHash: {
        type: String,
        required: [true, 'The encripted hash is required.'],
        validate: {
            validator: (s) => s.length > 1,
            message: 'Certificate must be longer than 1024 characters.'
        }
    },

    message: {
        type: String,
        required: [true, 'Message is required,']
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);