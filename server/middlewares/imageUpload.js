const multer = require('multer');

/* ------------------------ Configuring multer : for file uploads ----------------------- */

// We avoid this for now because the storage to directory part is being done by sharpJS after compression
// hence we will use multer.memoryStorage()

exports.uploadToMemory = (imageAttributeName) => {
    return  multer({
                storage : multer.memoryStorage()
            }).single(imageAttributeName);
}
//ABOVE : imageFieldName is the "key" with which the client sends the image file in the request body