const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 5,
    port        : process.env.MYSQL_ADDON_PORT,
    host        : process.env.MYSQL_ADDON_HOST,
    user        : process.env.MYSQL_ADDON_USER,
    password    : process.env.MYSQL_ADDON_PASSWORD,
    database    : process.env.MYSQL_ADDON_DB,
});

module.exports = pool