const express = require("express")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')
require("dotenv").config()  // Acquiring .env file to get access to sensitive information

const app = express()

/* ------------------------------- middlewares ------------------------------ */

// Indicating static files to express :
app.use( express.static('public') );

// For parsing application/json :
app.use( bodyParser.json() );

// For parsing application/x-www-form-url-encoded :
app.use( bodyParser.urlencoded({ extended : true }) );

// For parsing cookies :
app.use(cookieParser());

// for crossorigin requests :
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}))


/* --------------------------------- routers -------------------------------- */
const apiRouter = require("./routes/api.routing.js")


app.use('/api', apiRouter);



// Listening on Port 8000 :

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on Port : ${PORT}`);
})

