const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const { uploadFile } = require('./googleConnection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());


//home route
app.get('/', async (req, res) => {

    res.send({ msg: 'Api is running' })

});


//upload file route
app.post('/upload', async (req, res) => {

    try {

        const files = req.files
        if (files && files.length > 0) {
            
            const uploadedFileURL = await uploadFile(files[0]);
            res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL });
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }

    }
    catch (err) {
        res.status(500).send({ msg: err })
    }

})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});