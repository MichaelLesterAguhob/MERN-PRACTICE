const User = require('../models/User');

module.exports.addUser = async (req, res) => {
    const newUser = new User({
        fName: req.body.fName,
        mName: req.body.mName,
        lName: req.body.lName
    });

    newUser.save().then(() => {
        res.status(200).send({message : "User Added Successfully"});
    })
}

module.exports.showUsers = async (req, res) => {
    return User.find({}).then(result => {
        res.status(200).send(result);
    })
}


module.exports.deleteUser = async (req, res) => {
    return User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).send( {message: "Sucessfully deleted"} );
    }).catch(err => console.log(err.json()))
}

module.exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const {fname, mname, lname} = req.body;

    await User.findByIdAndUpdate(
        userId, 
        {
            fName: fname, 
            mName: mname, 
            lName: lname
        }, 
        {new:true})
        .then(() => { res.status(200).send({ message: "Updated Successfully"}) })
        .catch(err => { console.log(err.json()) })
}