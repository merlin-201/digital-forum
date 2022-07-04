const { Advertisement, CronLog } = require("../models");
const { Op } = require("sequelize");

const currentTime = new Date();

const createLog = async (advertisement, changedStatus, actionStatement) => {
    try {
        await CronLog.create({
            ad_id : advertisement.id,
            ad_name : advertisement.name,
            ad_start_date :advertisement.start_date,
            ad_end_date : advertisement.end_date,
            status_before : advertisement.status,
            status_after : changedStatus,
            action : actionStatement
        });

        return 0;

    } catch (error) {
        console.log(error);
    }
}

const activateAds = async () => {
    let adActivationCondition = {
        start_date : { [Op.lt] : currentTime },
        status : "approved"
    }

    let adsToBeActivated = await Advertisement.findAll({
        where : adActivationCondition
    });

    await Advertisement.update({ status : "active"},
    {
        where : adActivationCondition
    });

    await Promise.all(
        adsToBeActivated.map( (ad) => createLog(ad, "active", "Ad was activated"))
    )

    return adsToBeActivated.length;
}

const expireAds = async () => {
    let adExpirationCondition = {
        end_date : { [Op.lt] : currentTime },
        status : "active"
    }

    let adsToBeExpired = await Advertisement.findAll({
        where : adExpirationCondition
    });

    await Advertisement.update({ status : "expired"},
    {
        where : adExpirationCondition
    });


    await Promise.all(
        adsToBeExpired.map( (ad) => createLog(ad, "expired", "Ad was expired"))
    )

    return adsToBeExpired.length;
}

const pendingAds = async () => {
    let cannotBeActivatedCondition = {
        start_date : { [Op.lt] : currentTime },
        status : "pending"
    }

    let adsThatCannotBeActivated = await Advertisement.findAll({
        where : cannotBeActivatedCondition
    });


    await Promise.all(
        adsThatCannotBeActivated.map( (ad) => createLog(ad, "pending", "Ad could not be activated because approval is still pending"))
    )

    return adsThatCannotBeActivated.length;
}


const start = async () => {

    try {
        let num;

        num = await activateAds();
        console.log(num, " ads were activated");

        num = await expireAds();
        console.log(num, " ads were activated");


        num = await pendingAds();
        console.log(num, " ads could not be activated");

    } catch (error) {
        console.log(error);
    }

    process.exit(0);
}

start();