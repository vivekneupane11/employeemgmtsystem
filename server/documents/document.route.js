const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;



//Setting up our storage

let storage = multer.diskStorage({
    destination: function(req, file, cb) {

        console.log("destination::" + file);
        cb(null, 'uploads/');

    },
    filename: function(req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },

});
//uploading file and filtering for pdf only
let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        let fileExtension = path.extname(file.originalname);

        if (fileExtension !== '.pdf') {
            const error = new Error("Only pdf format supported !!!");
            error.statusCode = 405;
            return cb(error, false);
        }
        cb(null, true);
    }



});
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');

});
router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const DOCUMENTS = req.db.collection('documents');
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.statusCode = 400
        return res.status(400).json({
            message: "File Not-allowed " + error,
            suggest: "Only .pdf file supported ",
            success: false
        });
    }

    console.log(req.file.filename);
    req.body.title = "Hero";
    req.body.description = "Superman Spiderman Ironman";

    DOCUMENTS.insertOne({ filename: req.file.filename, title: req.body.title, description: req.body.description, author: req.body.email, visibility: req.body.visibility });
    DOCUMENTS.find({}).toArray(function(error, result) {
        if (error) {
            error.statusCode = 500; //internal server error
            next(error);
        }
        res.status(200).json({
            status: 200,
            message: {
                error: null,
                data: result,
                success: true
            }
        });
    });

});


module.exports = router;