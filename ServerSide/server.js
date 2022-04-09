require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const app = express();
const fileUpload = require('express-fileupload')
const path = require('path');

const PORT = process.env.port || 5000
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))
// initizing passport here
app.use(passport.initialize());

const URL = process.env.MONGODB

mongoose.connect(URL)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongoDB database connection extablished successfully")
});

app.use('/user', require('./routers/userRoutes'))
app.use('/user/img', require('./routers/uploadIMG'))


app.listen(PORT, (req, res) => {
    console.log(`Your application is runnning on this = ${PORT} PORT`)
})









