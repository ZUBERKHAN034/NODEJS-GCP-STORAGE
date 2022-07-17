const { Storage } = require('@google-cloud/storage');
const { format } = require("util")

const GCP_KEY_FILE_NAME = 'google-cloud-key.json';
const GCP_PROJECT_ID = 'qwiklabs-gcp-02-aa5857463c67';
const GCP_BUCKET_NAME = "bucket-for-nodejs";

// Instantiate a storage client with credentials
const storage = new Storage({
    //GCP Service-Key JSON file setup
    keyFilename: GCP_KEY_FILE_NAME,
    //GCP Project-ID setup
    projectId: GCP_PROJECT_ID,
});

//bucket setup
const bucket = storage.bucket(GCP_BUCKET_NAME); //ENTER BUCKET NAME

const uploadFile = (file) => new Promise((resolve, reject) => {

    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));

    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream.on('finish', () => {

        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);

    })
        .on('error', (err) => {
            console.log(err)
            reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
});


module.exports = { uploadFile }