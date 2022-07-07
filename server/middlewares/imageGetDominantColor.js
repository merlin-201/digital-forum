const path = require('path')
const { extractColors } = require('extract-colors')
const fs = require("fs/promises");

exports.getDominantColor = async (req, res, next) => {
    if( !req.file ){
        // no file was recieved . Proceed to controller function
        next();
    }
    else{
        const imgName = req.file.fileSaveName;

        const imgPath = process.cwd() + '/public/uploads/' + imgName;

        const colors = await extractColors(imgPath);

        let WHITE_LIMIT = 240;

        let dominantColor;
        for( let color of colors ){
            if( color.red > WHITE_LIMIT && color.green > WHITE_LIMIT && color.blue > WHITE_LIMIT){
            continue;
            }
            dominantColor = color;
            break;
        }

        req.file.dominantColor = dominantColor.hex;

        next();
    }
}