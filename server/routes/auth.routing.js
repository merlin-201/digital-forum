const express = require('express')

// For QR Code And Verification
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const authController = require("../controllers/auth.controller.js")

const router = express.Router()

router.post("/signup", authController.signup);
router.post("/verify", authController.verify);
router.post("/login", authController.login);


module.exports = router