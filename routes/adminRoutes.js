var express = require('express');
const router = express.Router();
var ejs = require('ejs');

router.get("/", function (req, res) {
    res.render("admin/dashboard");  
});

module.exports = router;
