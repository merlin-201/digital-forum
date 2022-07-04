const { User } = require("../models");

const {verifyToken} = require('../services/jwt');


exports.requireAuth = (optional = false) => async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    try {
        if(!token)
            throw "no authentication token found";

        let decodedToken = verifyToken(token);

        // bad tokens throw a error and are caught in the catch block
        let userId = decodedToken.id;

        let user = await User.findOne({
            where : { id : userId }
        });

        if(!user)
            throw "invalid authentication token";
        
        res.locals.user = user;
        next();
    } catch (error) {
        if(!optional)
            return res.status(401).json( { message : error.message || error });
        else
            next();
    }

}