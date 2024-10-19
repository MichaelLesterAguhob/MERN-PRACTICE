const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {createAccessToken} = require('../auth');

module.exports.signUp = (req, res) => {
     const {name, email, password} = req.body;

    if(name === "" || email === "" || password === "") {
        return res.status(400).send({message: "Please fill in the blank(s)"});
    }

    if(!email.includes("@")) {
        return res.status(400).send({message: "Invalid Email Format"});
     }

    if(password.length < 8) {
        return res.status(400).send({message: "Password must be 8 or more characters"});
     }

     User.find({email}).then((result) => {
        if(result) {
            return res.status(409).send({message: "Email is already exists"})
        }
     })

     const userData = new User({
        name: name, 
        email: email, 
        password: bcrypt.hashSync(password, 10)
     });

     userData.save().then((result) => {
        if(result) {
            res.status(201).send({message: "Successful", result});
        } else {
            res.status(400).send({message: "Unsuccessful", result});
        }
     }).catch(error => console.log(error));
}


module.exports.signIn = (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    if(!email.includes('@')) {
        return res.status(400).send({message: "Invalid Email Format"});
    }

    User.findOne({email: req.body.email}).then( (result) => {
        console.log(result);
        if(!result) {
            return res.status(400).send({message: "Email not found"});
        }
        const isPasswordMatched = bcrypt.compareSync(password, result.password);
        if(isPasswordMatched) {
            res.status(200).send({message: "Successfully Loggedin", access: createAccessToken(result)});
        }
    } )
}


