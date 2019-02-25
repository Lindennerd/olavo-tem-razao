var express = require('express');
var jimp = require('jimp');
var router = express.Router();

var olavoOptions = require('../generator');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', olavoOptions);
});

router.get('/generator', function (req, res, next) {
    try {
        var olavoTheory = generateTheory(
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateTheory(whoInd, areInd, workingWithInd, todoInd) {
    var whoIndex = whoInd 
        ? whoInd 
        : getRandomInt(0, olavoOptions.who.length);

    var areIndex = areInd 
        ? areInd 
        : getRandomInt(0, olavoOptions.are.length);

    var workingWithIndex = workingWithInd 
        ? workingWithInd 
        : getRandomInt(0, olavoOptions.workingWith.length);

    var todoIndex = todoInd
        ? todoInd 
        : getRandomInt(0, olavoOptions.todo.length);

    var olavoTheory = olavoOptions.who[whoIndex] + " " +
        olavoOptions.are[areIndex] + " " +
        olavoOptions.workingWith[workingWithIndex] + " " +
        olavoOptions.todo[todoIndex];

    return olavoTheory;
}

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
