var pool = require("../db/connection");

exports.getSubCategory = async (req, res) => {
    var {categoryId} = req.body
    try{
        var query = `SELECT * FROM topic WHERE category_id = ${categoryId}`
        var [result, _] = await pool.execute(query)
        console.log(result)
        res.send(result)
    }catch(error){
        res.send(error)
    }
}