let jwt = require('jsonwebtoken')
const config = require('./config')

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token && token.startsWith('Bearer '))
    {
        token = token.slice(7, token.length);
    }

    if(token)
    {
        console.log("Check token")
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log("Tokennya error")
                return res.json({
                    success: false,
                    message: 'Token is invalid'
                });;
            }
            else {
                console.log("Tokennya benar")
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    }
    else
    {
        console.log("Tidak ada token")
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken : checkToken
}