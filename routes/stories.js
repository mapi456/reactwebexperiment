var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

let storyPath = './public/pdfs';

/* GET users listing. */
router.get('/:title', function (req, res) {
    fs.readdir(storyPath, (err, files) => {
        if (req.params.title.toLowerCase() == 'index') {
            console.log(files);
            console.log(req.params.title);
            let out = files;
            res.send(files.toString());
        } else {
            console.log(files);
            console.log(req.params.title);
            console.log(__dirname + '/../public/pdfs');
            res.sendFile(path.resolve(__dirname + '/../public/pdfs/' + req.params.title + '.pdf'), (err) => {
                console.error(err);
            })
        }
    });
});

module.exports = router;
