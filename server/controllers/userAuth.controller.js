const { User } = require("../models"); 

/* ---------------------------------- T-OTP --------------------------------- */
const speakeasy = require("speakeasy");
const QRCode = require("qrcode")

/* -------------------------------- services -------------------------------- */
const { issueToken } = require("../services/jwt.js");

const ATTRIBUTES_TO_OMIT = [ "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip" ]


exports.signup = async (req, res) => {
    // this controller we generate the QR code that will convey the secret to Google Authenticator
    // !! but before that we validate the uniqueness of the email and username that the client has sent

    const { email, username } = req.body;
    try {
        let user;

        /* ---------------- check if user with email already exists : --------------- */
        user = await User.findOne({
            where : { email }
        });

        // if user with email already exists send 400 : Bad Request Error Code
        if( user )
            return res.status(400).json({ message : "user with this email already exists"});
        
        /* -------------- check if user with username already exists : -------------- */
        user = await User.findOne({
            where : { username }
        });

        // if user with username already exists send 400 : Bad Request Error Code
        if( user )
            return res.status(400).json({ message : "username already taken"});


        
        let secertString = username;

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

        QRCode.toDataURL(url, (err, dataURL) => {
            if(err) throw err;
            
            return res.status(200).json({
                "tempSecret" : tempSecret.base32,
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
    // in this controller we do two things :
    // 1. get the totp from client and verify it against the secret
    // 2. IF AND ONLY IF verified we then insert our new user into the DB

    const { firstname, lastname, username, email, tempSecret, totp} = req.body;
    try {

        // verify the user sent totp by comparing with the tempSecret stored in temp DB
        let isVerified = speakeasy.totp.verify({
            secret: tempSecret,
            token: totp,
            encoding: 'base32'
        });

        // if totp is wrong
        if( !isVerified )
            return res.status(401).json({ message : "Wrong T-OTP. Please Try Again" });

        console.log(`DEBUG: TOTP verified`);

        const newUser = await User.create({ firstname, lastname, username, email, secret : tempSecret });

        if( !newUser )
            res.status(424).json({ message : "Could not create user"});

        const user = await User.findOne({
            where : { id : newUser.id },
            attributes : { exclude : ATTRIBUTES_TO_OMIT }
        })

        // these two fields need not be sent into the response body
        user.password = undefined;
        user.secret = undefined;

        res.status(201).json({
            verified : true,
            user : user
        });

    } catch (error) {
        console.log(error)
        console.log(error.name)

        if( error.name === "SequelizeUniqueConstraintError"){
            if( error.errors[0].path === "email")
                return res.status(400).json({ message : "user with this email already exists" });
            else if( error.errors[0].path === "username" )
                return res.status(400).json({ message : "username already taken" });
        }
        res.status(500).json({ message : "Something went wrong."});
    }
}

exports.login = async (req, res) => {
    // in this controller :
    // 1. we use the email sent in request body to get the user's secret from DB
    // 2. verify the totp sent in request body againts the retrieved secret
    // 3. IF AND ONLY IF verified... issue a JWT token

    const { email, totp } = req.body;

    try {

        let user = await User.findOne({
            where : { email },
            attributes : { exclude : ATTRIBUTES_TO_OMIT }
        })

        // if no user found with given email ID
        if( !user )
            return res.status(400).json({ message : "No account with this email"});

        let { secret } = user;

        let isVerified = speakeasy.totp.verify({
            secret : secret,
            token : totp,
            encoding : "base32"
        });

        if( !isVerified )
            return res.status(401).json({ message : "Wrong T-OTP. Please Try Again."});

        // add json web token into a cookie :
        let jsonWebToken = issueToken(user.id);

        // these two fields need not be sent into the response body
        user.password = undefined;
        user.secret = undefined;
        
        res.status(200).json({
            message : "Login Successful",
            token : jsonWebToken,
            user : user,
         })
 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}
