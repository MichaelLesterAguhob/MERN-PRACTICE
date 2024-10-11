const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    mName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);