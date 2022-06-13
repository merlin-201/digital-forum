var pool = require("../db/connection");

exports.getCategory = async (req, res) => {
    try {
        var query = `SELECT * FROM category`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
}