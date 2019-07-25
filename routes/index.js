var express = require('express');
var jimp = require('jimp');
var olavosMind = require('../lib/olavosMind');
var router = express.Router();

var olavoOptions = require('../generator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', olavoOptions);
});

router.get('/generator', function (req, res, next) {
    try {
        var olavoTheory = olavosMind.generateTheory(
            req.query.who,
            req.query.are,
            req.query.workingWith,
            req.query.todo
        );
        generateImage(olavoTheory, function(err, image) {
            res.send(image);
        });

    } catch(ex) {
        res.status(500).send(ex);
    }

 })

function generateImage(text, callback) {
    
    jimp.read("./public/images/olavo-post.jpg")
        .then(function (image) {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK, function(fontErr, font) {
                if(fontErr) throw fontErr;

                image.print(font, 10, 90, text, 700, 100, function(printErr, printedImage) {
                    if(printErr) throw printErr;

                    printedImage.getBase64(jimp.AUTO, function(err, result){
                        if(err) throw err;

                        if(callback) callback(err, result);
                    })
                })
            });
        });
}

module.exports = router;
