
const Todo = require('../models/Todo');


module.exports.addTask = (req, res) => {
    // return res.send(req.user.id);

    const {toDo} = req.body;
    if(toDo === "") {
        return res.status(400).send({message: "Fill in the blanks"})
    }
    const newTodo = new Todo({
        userID: req.user._id,
        toDo: toDo
    })

    newTodo.save().then( (result) => {
        if(result) {
            return res.status(200).send({message: "Successfully saved", result})
        }
    }).catch(error => res.status(500).send({Error: "Error encountered while saving", error}))

}