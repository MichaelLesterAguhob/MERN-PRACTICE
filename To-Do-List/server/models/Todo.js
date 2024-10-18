const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, 'UserID is required']
    }, 
    toDo: {
        type: String,
        required: [true, 'ToDo is required']
    }, 
})


module.exports = mongoose.model('Todo', todoSchema);