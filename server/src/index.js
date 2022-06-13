const express = require("express")
const app = express()
const path = require('path')
const cors = require('cors')

//Port of our web application
const port = 8000 || process.env.PORT

// Acquiring .env file to get access to sensitive information
require("dotenv").config()

// Parse URL-encoded bodies as sent by HTML forms
app.use(express.urlencoded( {extended:false} ));

// makes sure that values grabbed from the form are in JSON format
app.use(express.json());

//Setting Up the UI(Views)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use(cors())

app.use("/auth", require("./routes/auth"))
app.use("/category", require("../src/routes/category"))
app.use("/post", require("../src/routes/post"))


//listening to the specified port
app.listen(port, () => {
    console.log(`Connection to ${port} is established successfully.`)
})