var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var ejs = require('ejs'); 

var userRouter = require('./routes/userRoutes.js');
var adminRouter = require('./routes/adminRoutes.js');

const app = express();

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});
