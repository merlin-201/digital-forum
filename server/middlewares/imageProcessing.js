const sharp = require('sharp');
const { v4 : uuidv4 } = require("uuid");

/* --------------- sharp.js middleware for compressing and storing our images ----------- */

exports.compressAndStore = async (req, res, next) => {
    if( !req.file ){
        // no file was recieved . Proceed to controller function
        next();
    }
    else{
        let savePath = './public/uploads/';

        //let ext = req.file.mimetype.split('/')[1];
        // ABOVE : (original extension of the image file... forcing it to .jpeg on our server :) )

        // dont store image with the name provided by client
        // giving a random savename to the image file
        let fileSaveName = `${uuidv4()}-min.jpeg`;

        try{
            await sharp(req.file.buffer)
                    .resize({
                        width : 500,
                        height : 500
                    })
                    .flatten({ background: '#ffffff' })     //transparent -> white
                    .toFormat("jpeg", { mozjpeg: true })
                    .jpeg({ quality : 50 })
                    .toFile(savePath + fileSaveName)
        }
        catch(err){
            console.log(err);
        }

        // attaching the savename onto the req.file object
        // this will be extracted in the controller function to finally save the name string into DB
        req.file.fileSaveName = fileSaveName;

        next();
    }
}

exports.getDimensionsAndStore = async (req, res, next) => {
    if( !req.file || !req.body.name ){
        // no file was recieved . Proceed to controller function
        next();
    }
    else{
        let savePath = './public/ad-banners/';

        //let ext = req.file.mimetype.split('/')[1];
        // ABOVE : (original extension of the image file... forcing it to .jpeg on our server :) )

        // dont store image with the name provided by client
        // giving a random savename to the image file
        const adName = req.body.name.replace(/\s/g,'-');  //ad name with all whitespaces replaced with "-"
        const fileSaveName = `${adName}-${uuidv4()}.jpeg`;

        try{
            let image = sharp(req.file.buffer);

            let imageMetaData = await image.metadata();

            await image.toFile(savePath + fileSaveName);

            req.body.bannerHeight = imageMetaData.height;
            req.body.bannerWidth = imageMetaData.width;

            req.body.banner = fileSaveName;

            next();
        }
        catch(error){
            console.log(error);
            console.log(error.name);

            res.status(500).json({ message : "Something went wrong"});
        }
    }
}