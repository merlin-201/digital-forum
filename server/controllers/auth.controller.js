const mysql = require("mysql");

/* ---------------------------------- T-OTP --------------------------------- */
const speakeasy = require("speakeasy");
const QRCode = require("qrcode")

/* --------------------------------- temp DB -------------------------------- */
// to temporarily store user data 
// user data is added to actual SQL db only after verification
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const uuid = require("uuid");
let db = new JsonDB(new Config("tempAuthDatabase", true, false, '/'));

/* -------------------------------- services -------------------------------- */
const { queryAsync } = require("../services/database.js");
const { filterUserObject } = require("../services/queryObjectFilters.js");
const { issueToken } = require("../services/jwt.js");

/* -------------------------------- constants ------------------------------- */
const COOKIE_OPTIONS = {
        maxAge : 24*60*60*1000, //i.e maxAge is 1 day in milliseconds
        httpOnly : true
}

exports.signup = async (req, res) => {
    try {
        console.log(req.body);
        
        const { firstname, lastname, email, phone } = req.body;

        // check if user with email already exists :

        let q  = "SELECT * FROM user WHERE email=?";
        q = mysql.format(q, [email]);
        let results = await queryAsync(q);

        // if user with email already exists send 400 : Bad Request Error Code
        if( results.length !== 0)
            return res.status(400).json({ message : "User with this email already exists"});
        
        let secertString = email;

        // this is the info that will shown in the user Google authenticator mobile app
        const tempSecret = speakeasy.generateSecret({
            length: 10,
            name: secertString,
            issuer: process.env.ISSUER_NAME
        });

        let url = speakeasy.otpauthURL({
            secret: tempSecret.base32,
            label: secertString,
            issuer: process.env.ISSUER_NAME,
            encoding: 'base32'
        });

        // making an entry into temp DB to use later in /verify
        const tempUserId = uuid.v4();
        const path = `/user/${tempUserId}`;

        db.push(path, { tempUserId, tempSecret, firstname, lastname, email, phone });

        //secretOfUser = secret.base32

        QRCode.toDataURL(url, (err, dataURL) => {
            if(err) throw err;
            
            return res.status(200).json({
                "userId" : tempUserId,
                "qr" : dataURL
            });
        });
    }
    catch(error) {
        console.log(error)
        res.status(500).json( {message : "Something went wrong." });
    }
}

exports.verify = async (req, res) => {
    try {
        const { userId : tempUserId , totp : token } = req.body;
        
        //get tempSecret that was stored in temporary DB :
        const path = `/user/${tempUserId}`;
        const user = db.getData(path);
        console.log({ user });
        const { base32 : secret } = user.tempSecret;

        // verify the user sent totp by comparing with the tempSecret stored in temp DB
        let isVerified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token
        });

        // if totp is wrong
        if( !isVerified )
            return res.status(401).json({ message : "Wrong T-OTP. Please Try Again" });


        console.log(`DEBUG: TOTP verified`);

        const { firstname, lastname, email, phone } = user;

        let q = "INSERT INTO user(firstname, lastname, email, phone, secret) VALUES(?, ?, ?, ?, ?)";
        q = mysql.format(q, [firstname, lastname, email, phone, secret])

        const results = await queryAsync(q);
        console.log(results);

        if( results.affectedRows === 1){
            res.status(201).json({ verified : true });
        }else{
            res.status(424).json({ message : "Could not create user"});
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Something went wrong."});
    }
    
}

exports.login = async (req, res) => {
    try {
        const {email, totp : token } = req.body;

        let q = "SELECT * FROM user WHERE email = ?";
        q = mysql.format(q, [email]);

        let results = await queryAsync(q);

        // if no user found with given email ID
        if( results.length === 0)
            return res.status(400).json({ message : "No account with this email"});
        
        let user = results[0];

        let { secret } = user;

        let isVerified = speakeasy.totp.verify({
            secret : secret,
            token : token,
            encoding : "base32"
        });

        if( !isVerified )
            return res.status(401).json({ message : "Wrong T-OTP. Please Try Again."});

        // add json web token into a cookie :
        let jsonWebToken = issueToken(user.id);
        
        res.status(200).json({
            message : "Login Successful",
            data : filterUserObject(user),
            token : jsonWebToken
         })
 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}
