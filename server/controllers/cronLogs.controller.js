const { CronLog } = require("../models");
const { v4 : uuidv4 } = require("uuid");
const excel = require('exceljs');
const fs = require("node:fs/promises");
const { Op } = require("sequelize");

exports.downloadCronLogs = async (req, res) => {
    let startDate, endDate;

    // building Date objects from the startDate and endDate in req.body
    try {

        //req.body.startDate : 01/11/2021
        //req.body.endDate : 31/12/2021
        let startDateString = req.body.startDate.split("/").reverse().join("-");    // 01/11/2021 => 2021-11-01
        let endDateString = req.body.endDate.split("/").reverse().join("-");        // 31/12/2021 => 2021-12-31

        startDate = new Date(startDateString)
        endDate = new Date(endDateString)
        endDate.setSeconds( endDate.getSeconds() + 24*60*60 - 1); // to completely include the endDate i.e 2021-12-31 00:00:00 => 2021-12-31 23:59:59
        
    } catch (error) {
        return res.status(400).json({ message : 'Improper request body. Please check the date formats'})
    }


    // querying the database and saving all data into audit_trails.xlxs in public folder :

    try {
        // the name with which the file is saved temporarily in the /public folder
        let fileSaveName = `cron_logs_${uuidv4()}.xlsx`;

        // the name with which the file is downloaded at the client side
        let fileDownloadName = `cron_logs_[${req.body.startDate.replaceAll('/','-')}_to_${req.body.endDate.replaceAll('/','-')}]`;

        let cronLogs = await CronLog.findAll({
            where : {
                timestamp : {
                    [Op.between] : [startDate, endDate]
                }
            },
            order : [ ["timestamp", "DESC"] ]
        });


        //before insertion into workbook we convert the AuditTrail objects into plain JSON objects
        let rows = cronLogs.map( (cronLog) => {
            return {
                ...cronLog.toJSON(),
                ad_start_date : cronLog.ad_start_date.toISOString(),
                ad_end_date : cronLog.ad_end_date.toISOString(),
                timestamp : cronLog.timestamp.toISOString()
            }
        });
        // REASON FOR OVERRIDING THE timestamp FIELDS ABOVE :
        // timetamps are fetched from DB as Date objects
        // exceljs does something weird and prints those in excel file just as the date , and ignores the hh:mm:ss
        // so we convert each Date object into equivalent ISO String i.e 2022-05-05T06:37:56.000Z and then write it to excel file
        

        // ---------------------- setting up the excel workbook --------------------- 
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('cron_logs');

        // the column width was decided by trail and error :)
        worksheet.columns = [
            {header : 'id',             key:'id',               width:30},
            {header : 'timestamp',      key:'timestamp',        width:30},
            {header : 'ad_id',          key:'ad_id',            width:30},
            {header : 'ad_name',        key:'ad_name',          width:30},
            {header : 'ad_start_date',  key:'ad_start_date',    width:30},
            {header : 'ad_end_date',    key:'ad_end_date',      width:30},
            {header : 'status_before',  key:'status_before',    width:20},
            {header : 'status_after',   key:'status_after',     width:20},
            {header : 'action',         key:'action',           width:50},
        ]

        // add rows
        worksheet.addRows(rows);

        // save the file locally (we will delete it later)
        await workbook.xlsx.writeFile(`./public/${fileSaveName}`);

        console.log(`File saved succesfully as : ${fileSaveName}`);

        // we have to get out of the server/controllers folder :
        let dir_path = __dirname.split('\\').slice(0,-1).join('/');

        //building actual path of the file in public folder :
        let filePath = `${dir_path}//public/${fileSaveName}`;
        
        // sending our file to client with custom file name :
        res.download(filePath, fileDownloadName, async () => {
            await fs.unlink(filePath)
            console.log(`File ${fileSaveName} deleted`);
        });


    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json({ message : "Something went wrong."})
    }
}

exports.purgeCronLogs = async (req, res) => {
    let beforeDate;

    try {
        let beforeDateString = req.body.beforeDate.split("/").reverse().join("-");    // 01/11/2021 => 2021-11-01
        beforeDate = new Date( beforeDateString );
    } catch (error) {
        return res.status(400).json({ message : 'Improper request body. Please check the date formats'});
    }

    try {
        let deletedCount = await CronLog.destroy({
            where : {
                timestamp : {
                    [Op.lt] : beforeDate
                }
            }
        });

        res.status(200).json({deletedCount});
    } catch (error) {
        console.log(error);
        console.log(error.name);

        res.status(500).json({ message : "Something went wrong."})
    }

}
