const { Advertisement } = require("../models");
const { Sequelize } = require("sequelize");

exports.getAdvertisement = async (req, res) => {
    const advertisementId = req.params.id;
    try {
        let advertisement = await Advertisement.findOne({
            where : { id : advertisementId }
        });

        if(!advertisement)
            return res.status(404).json({ message : "No advertisement found with this ID"});

        res.status(200).json(advertisement);
    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json( { message : "Something went wrong."} )
    }
}

exports.getAdvertisementAll = async (req, res) => {
    try {
        let advertisements = await Advertisement.findAll();

        res.status(200).json({
            count : advertisements.length,
            data : advertisements
        })
    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json( { message : "Something went wrong."} )
    }
}

exports.createAdvertisement = async (req, res) => {
    let startDate, endDate;

    try {
        // changing date format to something suitable for our SQL query :
        startDateString = req.body.startDate.split('/').reverse().join('-');
        endDateString = req.body.endDate.split('/').reverse().join('-');

        startDate = new Date(startDateString);
        endDate = new Date(endDateString);
        endDate.setSeconds( endDate.getSeconds() + 24*60*60 - 1); // to completely include the endDate i.e 2021-12-31 00:00:00 => 2021-12-31 23:59:59
    } catch (error) {
        return res.status(400).json( { message : "invalid format for startDate or endDate"})
    }

    // the pages array is a stringified array, we need to parse it
    let pages = JSON.parse( req.body.pages || null );


    try {
        let newAdvertisement = await Advertisement.create({
            name : req.body.name,
            banner : req.body.banner,
            banner_height : req.body.bannerHeight,
            banner_width : req.body.bannerWidth,
            start_date : startDate,
            end_date : endDate,
            target_url : req.body.targetUrl,
            section : req.body.section,
            pages : pages,
        });

        let advertisement = await Advertisement.findOne({
            where : { id : newAdvertisement.id }
        });

        res.status(201).json(advertisement);

    } catch (error) {
        //console.log(error);
        console.log(error.name);
        console.log(error.errors);
        

        if( error.name === "SequelizeValidationError"){
            let errorObject = error.errors[0];

            if( errorObject.type === "notNull Violation")
                return res.status(400).json( { message : `'${errorObject.path}' attribute cannot be null`} );
            else if( errorObject.type === "Validation error")
                return res.status(400).json( { message : errorObject.message } );
    
        }

        res.status(500).json({ message : "Something went wrong"});
    }
}

exports.updateAdvertisement = async (req, res) => {
    const advertisementId = req.params.id;

    let startDate, endDate;

    try {
        // changing date format to something suitable for our SQL query :
        startDateString = req.body.startDate.split('/').reverse().join('-');
        endDateString = req.body.endDate.split('/').reverse().join('-');

        startDate = new Date(startDateString);
        endDate = new Date(endDateString);
        endDate.setSeconds( endDate.getSeconds() + 24*60*60 - 1); // to completely include the endDate i.e 2021-12-31 00:00:00 => 2021-12-31 23:59:59
    } catch (error) {
        return res.status(400).json( { message : "invalid format for startDate or endDate"})
    }

    // the pages array is a stringified array, we need to parse it
    let pages = JSON.parse( req.body.pages || null );


    try {
        let [updatedCount] = await Advertisement.update({
            name : req.body.name,
            banner : req.body.banner,
            banner_height : req.body.bannerHeight,
            banner_width : req.body.bannerWidth,
            start_date : startDate,
            end_date : endDate,
            target_url : req.body.targetUrl,
            section : req.body.section,
            pages : pages || undefined,
        },
        {
            where : { id : advertisementId }
        });

        if( updatedCount === 0 )
            return res.status(404).json({ message : "No advertisement found with this ID"});

        let advertisement = await Advertisement.findOne({
            where : { id : advertisementId }
        });

        res.status(200).json(advertisement);

    } catch (error) {
        console.log(error);
        console.log(error.name);
        console.log(error.errors);
        

        if( error.name === "SequelizeValidationError"){
            let errorObject = error.errors[0];

            if( errorObject.type === "notNull Violation")
                return res.status(400).json( { message : `'${errorObject.path}' attribute cannot be null`} );
            else if( errorObject.type === "Validation error")
                return res.status(400).json( { message : errorObject.message } );
    
        }

        res.status(500).json({ message : "Something went wrong"});
    }
}

exports.changeAdvertisementStatus = async (req, res) => {
    let advertisementId = req.params.id;

    try {
        let status = req.body?.status;

        if( !status )
            return res.status(400).json({ message : "'status' field cannot be null"});
        
        let [updatedCount] = await Advertisement.update({ status },{
            where : { id : advertisementId }
        });

        if( updatedCount === 0 )
            return res.status(404).json({ message : "No advertisement found with this ID"});
        
        let advertisement = await Advertisement.findOne({
            where : { id : advertisementId }
        });

        res.status(200).json(advertisement);
    
    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json({ message : "Something went wrong"});
    }
}

// dummy endpoint to fetch ads to be shown on the frontend
// right now it just picks out the vertically suitable ads
exports.fetchAdvertisements = async (req, res) => {

    try {
        let advertisements = await Advertisement.findAll({
            where : Sequelize.literal('banner_width / banner_height <= 1.5'),
            attributes : ["id", "name", "banner", "target_url", "section", "pages"]
        });

        res.status(200).json({
            count : advertisements.length,
            data : advertisements
        });
    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json( { message : "Something went wrong."} )
    }
}