
const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo');
const {verify} = require('../auth')


router.post('/addTask', verify, todoController.addTask);
 


module.exports = router 