const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.createAccessToken = (user) => {
    const data = {
        _id: user.id,
        email: user.email,
        password: user.password
    }

    return jwt.sign(data, process.env.JWT_SECRET_KEY, {})
}

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;
    if(token === "undefined") {
        return res.status(400).send({message: "Authentication failed. No token!"})
    } 

    token = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(error, decodedToken) {
        if(error) {
            return res.status(403).send({auth: "Failed", message: error.message})
        }
        console.log(decodedToken)
        req.user = decodedToken;
        next();
    });
}