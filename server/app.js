const express = require("express")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')
const { sequelize } = require("./models");
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

/* -------------------------------------------------------------------------- */
/*                             BREE JOB SCHEDULER                             */
/* -------------------------------------------------------------------------- */

const Bree = require('bree');

const bree = new Bree({
    jobs : [
      {
        name : 'advertisement',
        cron : "0 0 * * *",
      }
    ]
  })

bree.start();



/* ------------------------ Listening on Port 5000 : ------------------------ */

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on Port : ${PORT}`);
    try {
        //await sequelize.sync( { alter : true } );
        await sequelize.authenticate();
        console.log("Connected to DB successfully");
    } catch (error) {
        console.log("Could not connect to DB");
        console.log(error.message);
    }
});
    

