const mysql = require('mysql');
const {verifyToken} = require('../services/jwt');
const {queryAsync } = require('../services/database');

exports.requireAuth = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if(token){
        try{
            let decodedToken = verifyToken(token);

            // bad tokens throw a error and are caught in the catch block
            let userId = decodedToken.id;

            let q = "SELECT * FROM user WHERE id = ?";
            q = mysql.format(q, [userId]);

            let [user] = await queryAsync(q);

            if(!user)
                return res.status(401).json( { message : "invalid authentication token"})
            
            res.locals.user = user;
            next();

        }catch(err){
            res.status(401).json( { message : "invalid authentication token"})
        }
    }
    else{
        res.status(401).json( { message : "no authentication token found"})
    }
}