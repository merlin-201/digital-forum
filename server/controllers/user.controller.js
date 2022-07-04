const { User } = require("../models");
const { Op } = require("sequelize");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).json({
            count : users.length,
            data : users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({
            where : { id : userId }
        });

        if(!user)
            res.status(400).json({ message : "no user found with such ID"});

        res.status(200).json(user.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}

exports.searchUser = async (req, res) => {
    let searchTerm = req.query.q;
    try {
        const users = await User.findAll({
            where : {
                [Op.or] : [
                    { firstname : { [Op.startsWith] : searchTerm } },
                    { lastname : { [Op.startsWith] : searchTerm } },
                ] 
            }
        });

        res.status(200).json({
            count : users.length,
            data : users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something went wrong." });
    }
}
