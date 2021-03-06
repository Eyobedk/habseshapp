const jwt = require('jsonwebtoken');
require('dotenv').config()


module.exports.createToken = (id) =>{
    return jwt.sign({
        id
    }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 6000000
    })
}


module.exports.createTokenforDev = (id) =>{
    return jwt.sign({
        id
    }, process.env.DEVELOPER_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 6000000
    })
}
module.exports.createTokenforAdmin = (id) =>{
    return jwt.sign({
        id
    }, process.env.ADMIN_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 6000000
    })
}
module.exports.createRefToken = (id) =>{
    return jwt.sign({
        id
    }, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: 1.08e+7
    })
}


//DEVELOPER_