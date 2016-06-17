var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    var path = req.query.path;
    var index = path.indexOf(":8080/");
    path = ".." + path.substring(index+5);

    fs.readFile(path, function (err, file) {
        if (err) {
            res.status(404);
            res.end();
        }
        else {
            res.end(file);
        }
    });
});

router.post('/', function (req, res, next) {
    var path = req.body.path;
    var index = path.indexOf(":8080/");
    path = ".." + path.substring(index+5);
    console.log(path);

    fs.readFile(path, function (err, file) {
        if (err) {
            res.status(404);
            res.end();
        }
        else {
            res.end(file);
        }
    });
});

module.exports = router;