const fs = require("node:fs/promises")

exports.deleteUploadedImage = async (imageFileName) => {
    let filePath = `./public/uploads/${imageFileName}`;
    
    try {
        await fs.unlink(filePath);
        console.log(`image : ${imageFileName} was deleted`);
    } catch (error) {
        console.log("No file found for deletion");
        return
    }
}