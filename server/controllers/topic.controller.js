const mysql = require("mysql");

const { queryAsync } = require("../services/database");
const { filterTopicObject, filterPostObject } = require("../services/queryObjectFilters");

exports.getAllTopics = async (req, res) => {
    try {
        let q = "SELECT * FROM topic";

        let topics = await queryAsync(q);

        topics = topics.map( (topic) => filterTopicObject(topic));

        res.json({
            count : topics.length,
            data : topics
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

exports.getTopic = async (req, res) => {
    try {
        let topicId = req.params.id;

        let q = 
        `SELECT topic.*, category.name AS category_name `+
        `FROM topic, category `+
        `WHERE topic.id = ? AND topic.category_id = category.id`;
        q = mysql.format(q, [topicId]);

        let [topic] = await queryAsync(q);

        if(!topic)
            return res.status(404).json( { message : "No Topic found with such ID"} );
        
        topic = filterTopicObject(topic);

        res.status(200).json( topic );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}