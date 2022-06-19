const mysql = require("mysql");

const { queryAsync } = require("../services/database.js");
const { filterCategoryObject, filterTopicObject } = require("../services/queryObjectFilters.js");

exports.getAllCategories = async (req, res) => {
    try {
        let q = "SELECT * FROM category";

        let results = await queryAsync(q);

        res.status(200).json({
            count : results.length,
            data : results.map( result => filterCategoryObject(result))
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.getCategory = async (req, res) => {
    let q;
    try {
        let categoryId = req.params.id;

        q = "SELECT * FROM category where id = ?";
        q = mysql.format(q, [categoryId]);

        let results = await queryAsync(q);

        // no category found
        if( results.length === 0)
            return res.status(404).json({ message : "No category found with this ID"});
        
        let category = results[0];
        
        res.status(200).json(filterCategoryObject(category));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.getCategoryTopics = async (req, res) => {
    try {
        let categoryId = req.params.id;

        let q = "SELECT * FROM topic where category_id = ?";
        q = mysql.format(q, [categoryId]);

        let topics = await queryAsync(q);

        topics = topics.map( (topic) => filterTopicObject(topic));

        // WARNING : temporary patchwork below
        // Filling the posts_count_today property of each topic with a random number for now :
        topics = topics.map( (topic) => {
            return {
                ...topic,
                posts_count_today : Math.floor(Math.random() * (200 - 20) + 20)
            }
        })


        res.status(200).json({
            count : topics.length,
            data : topics
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

