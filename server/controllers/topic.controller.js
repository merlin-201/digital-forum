const { Topic, Category } = require("../models");
const { deleteUploadedImage } = require("../services/image");


exports.getAllTopics = async (req, res) => {
    try {
        let topics = await Topic.findAll();

        res.status(200).json({
            count : topics.length,
            data : topics
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

exports.getTopic = async (req, res) => {
    let topicId = req.params.id;
    try {
        
        let topic = await Topic.findOne({
            where : { id : topicId },
            include : {
                model : Category,
                attributes : [ "id", "name", "description" ],
                as : "category"
            }
        })

        if(!topic)
            return res.status(404).json( { message : "No Topic found with such ID"} );

        res.status(200).json( topic );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong" });
    }
}

exports.createTopic = async (req, res) => {
    const { category_id, name, description } = req.body;
    const thumbnail = req?.file?.fileSaveName;
    // ?. is optional chaining .. i.e if req.file exists only then req.file.fileSaveName is checked
    // otherwise thumbnail = undefined

    try {

        const newTopic = await Topic.create({ name, description, thumbnail, category_id });

        // get new Category from DB
        const topic = await Topic.findOne( {
            where : { id : newTopic.id }
        })


        res.status(201).json(topic);
    } catch (error) {
        console.log(error);

        if( error.name === 'SequelizeUniqueConstraintError' )
            return res.status(400).json({ message : "Topic with this name already exists."});
        else if( error.name === 'SequelizeValidationError' )
            return res.status(400).json({ message : "category_id cannot be null"});
        else if( error.name === 'SequelizeForeignKeyConstraintError')                               //category_id is the foreign key and it was not found in the category table
            return res.status(400).json({ message : "No category found with given category_id"});
    
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.updateTopic = async (req, res) => {
    const topicId = req.params.id;
    const { name, description, category_id } = req.body;
    const thumbnail = req?.file?.fileSaveName;
    // ?. is optional chaining .. i.e if req.file exists only then req.file.fileSaveName is checked
    // otherwise thumbnail = undefined

    try {
        //if new thumbnail was uploaded we need to delete the previous one..
        if(thumbnail){
            let oldTopic = await Topic.findOne( {
                where : { id : topicId },
                attributes : { include : "thumbnail" }
            });

            if(oldTopic)
                deleteUploadedImage(oldTopic.thumbnail);
        }

        const [updated] = await Topic.update({ name, description, thumbnail, category_id }, {
            where : { id : topicId }
        });


        if(!updated)
            return res.status(404).json({ message : "No topic found with this ID"});

        // get updated Category from DB
        const topic = await Topic.findOne( {
            where : { id : topicId }
        })

        res.status(200).json(topic);

    } catch (error) {
        console.log(error);
        console.log(error.name);

        if( error.name === 'SequelizeUniqueConstraintError' )
            return res.status(400).json({ message : "Topic with this name already exists."});
        else if( error.name === 'SequelizeForeignKeyConstraintError')                               //category_id is the foreign key and it was not found in the category table
            return res.status(400).json({ message : "No category found with given category_id"});

        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.deleteTopic = async (req, res) => {
    const topicId = req.params.id;
    try {
        const deleted = await Topic.destroy({
            where : { id : topicId },
        });

        if( !deleted )
            return res.status(404).json({ message : "No topic found with this ID"});
        
        return res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

// --> probably useless

// exports.searchTopic = async (req, res) => {
//     const categoryId = req.query.category;
//     const searchTerm = req.query.search;

//     try {
//         const topics = await Topic.findAll({
//             where : { 
//                 category_id : categoryId,
//                 name : { [Op.startsWith] : searchTerm }
//             }
//         });

//         res.status(200).json({
//             count : topics.length,
//             data : topics
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message : "Something went wrong" });
//     }
// }

exports.validateTopicName = async (req, res) => {
    let topicName = req.query.name;

    try {
        let topic = await Topic.findOne({
            where : { name : topicName }
        });

        if( topic )
            return res.json({ taken : true });
        else
            return res.json({ taken : false });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}