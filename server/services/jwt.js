const jwt = require('jsonwebtoken');

const MAX_AGE_IN_SECONDS = 24*60*60;

const issueToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {
            expiresIn : MAX_AGE_IN_SECONDS
        }
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {issueToken, verifyToken};