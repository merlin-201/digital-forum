const { Category, Topic } = require("../models");
const { deleteUploadedImage } = require("../services/image");

const ATTRIBUTES_TO_OMIT = [ "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.status(200).json({
            count : categories.length,
            data : categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.getCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {

        const category = await Category.findOne( {
            where : { id : categoryId },
            include : {
                model : Topic,
                attributes : { exclude : [...ATTRIBUTES_TO_OMIT, "category_id" ]},
                as : "topics"
            }
        })

        if(!category)
            return res.status(404).json({ message : "No category found with this ID"});
        
        res.status(200).json(category);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.createCategory = async (req, res) => {
    const { name, description } = req.body
    const thumbnail = req?.file?.fileSaveName;
    // ?. is optional chaining .. i.e if req.file exists only then req.file.fileSaveName is checked
    // otherwise thumbnail = undefined

    try {
        const newCategory = await Category.create({ name, description, thumbnail });

        // get new Category from DB
        const category = await Category.findOne( {
            where : { id : newCategory.id }
        })


        res.status(201).json(category);
    } catch (error) {
        console.log(error);

        if( error.name === 'SequelizeUniqueConstraintError')
            return res.status(400).json({ message : "Category with this name already exists."});

        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body
    const thumbnail = req?.file?.fileSaveName;
    // ?. is optional chaining .. i.e if req.file exists only then req.file.fileSaveName is checked
    // otherwise thumbnail = undefined

    try {
        //if new thumbnail was uploaded we need to delete the previous one..
        if(thumbnail){
            let oldCategory = await Category.findOne( {
                where : { id : categoryId },
                attributes : { include : "thumbnail" }
            });

            if(oldCategory)
                deleteUploadedImage(oldCategory.thumbnail);
        }

        const [updated] = await Category.update({ name, description, thumbnail }, {
            where : { id : categoryId }
        });


        if(!updated)
            return res.status(404).json({ message : "No category found with this ID"});

        // get updated Category from DB
        const category = await Category.findOne( {
            where : { id : categoryId }
        })

        res.status(200).json(category);

    } catch (error) {
        console.log(error);
        if( error.name === 'SequelizeUniqueConstraintError')
            return res.status(400).json({ message : "Category with this name already exists."});

        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deleted = await Category.destroy({
            where : { id : categoryId },
        })

        if( !deleted )
            return res.status(404).json({ message : "No category found with this ID"});
        
        return res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.validateCategoryName = async (req, res) => {
    let categoryName = req.query.name;

    try {
        let category = await Category.findOne({
            where : { name : categoryName }
        });

        if( category )
            return res.json({ taken : true });
        else
            return res.json({ taken : false });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

/*
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

*/

