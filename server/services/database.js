const pool = require('../config/database');

const queryAsync = (query) => {
    return new Promise( (resolve, reject) => {
        pool.query(query, (err, results)=>{
            if(!err){
                resolve(results);
            }
            else{
                reject(err);
            }
        });
    })
}

module.exports = {queryAsync};