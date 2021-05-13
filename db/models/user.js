const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        maxlength: 20,
        minlength: 3
    },
    password: {
        required: true,
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10);
        }
    },
    email: {
        required: true,
        type: String
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
