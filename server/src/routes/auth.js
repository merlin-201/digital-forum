const express = require('express')
const app = express()
const router = express.Router()

// For QR Code And Verification
const cors = require('cors');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
app.use(cors());

var pool = require("../db/connection");
const { redirect } = require('express/lib/response');

var secretOfUser = ""
var name = ""
var phone = ""
var email = ""

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/verify/:qr', (req, res) => {
    res.render('QR')
})


router.post("/register", async (req, res) => {

    name = req.body.name
    phone = req.body.phone
    email = req.body.email

    var sqlQuery = `SELECT * FROM user WHERE email="${email}"`
    try {
        const [rows] = await pool.query(sqlQuery)
        if (rows.length == 0) {

            var secertString = phone + email
            const secret = speakeasy.generateSecret({
                length: 10,
                name: secertString,
                issuer: 'Blog APP'
            });

            var url = speakeasy.otpauthURL({
                secret: secret.base32,
                label: secertString,
                issuer: 'Blog APP',
                encoding: 'base32'
            });

            secretOfUser = secret.base32

            QRCode.toDataURL(url, (err, dataURL) => {
                return res.render('QR', {
                    "qr": dataURL,
                });
            });

        } else {
            res.render('register', {
                "message": "User already exists, please login"
            });
        }

    } catch (e) {
        res.render('register', {
            "message": "Some thing went Wrong"
        });
    }
})


router.post('/verify', async (req, res) => {

    let isVerified = speakeasy.totp.verify({
        secret: secretOfUser,
        encoding: 'base32',
        token: req.body.token
    });

    if (isVerified) {
        console.log(`DEBUG: TFA is verified to be enabled`);

        var sqlQuery = `INSERT INTO user(firstname, email, mobile_number, secret) VALUES("${name}", "${email}", ${phone}, "${secretOfUser}")`

        try {
            const [rows] = await pool.query(sqlQuery)
            return res.redirect('/auth/login')
        } catch (e) {
            return res.render('QR', { "messsage": "Please Try Again!!" })
        }
    }
});


router.post('/login', async (req, res) => {

    var email = req.body.email
    var tempSecret = ""

    var sqlQuery = `SELECT * FROM user WHERE email="${email}"`
    try {
        const [rows] = await pool.query(sqlQuery)
        if (rows.length == 0) {
            return res.render("login", { "message": "User Does not exists, Please register to continue" })
        } else {
            tempSecret = rows[0].secret
        }
    } catch (e) {
        console.log(e)
    }

    let isVerified = speakeasy.totp.verify({
        secret: tempSecret,
        encoding: 'base32',
        token: req.body.token
    })

    if (isVerified) {
        return res.render('profile');
    }

    return res.render('login', {
        message: "Wrong Credentials"
    })
});

module.exports = router