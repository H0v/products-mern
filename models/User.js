const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: false,
    },
    userCredits: {
      type: String,
      required: false,
      default: '$0.00',
    },
    userCountry: {
        type: String,
        required: false,
    },
    password: {
      type: String,
      required: true,
    },
    passwordHash: {
        type: String,
        required: false,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
});

const userModel = model('User', UserSchema);

module.exports = userModel;