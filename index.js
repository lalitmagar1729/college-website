var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var ejs = require('ejs'); 
require('dotenv').config();

var userRouter = require('./routes/userRoutes.js');
var adminRouter = require('./routes/adminRoutes.js');

const app = express();

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(fileUpload());
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'ABCDEFGIJKLMNOPQRSTUVWXYZ',
    resave: false,
    saveUninitialized: false
}));

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(3001, function() {
    console.log('Server is running on http://localhost:3001');
});
