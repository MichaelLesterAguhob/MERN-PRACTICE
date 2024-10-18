
const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo');


router.post('/addTasks', todoController.addTask);



module.exports = router