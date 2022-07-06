
const Constants = require('../constants/constant')
const jwt = require('jsonwebtoken')

exports.responseMessages = (res, statusCode, status, message, data = []) =>{
    return res.status(statusCode).json({
        data: data,
        message : message,
        status: status
    })
}

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, Constants.TOKENSECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};