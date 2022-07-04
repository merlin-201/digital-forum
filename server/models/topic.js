'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Topic extends Model {

        /* ------------------------------ ASSOCIATIONS ------------------------------ */
        static associate(models){

            // many to one association with Category model i.e N topics : 1 Category
            this.belongsTo( models.Category, {
                foreignKey : "category_id",
                onDelete : "CASCADE",
                as : "category"
            });

            // one to many association with Topic model i.e 1 topic : N posts
            this.hasMany( models.Post, {
                foreignKey : "topic_id",
                onDelete : "CASCADE",
                //as : "posts"
            });
        }

        // whenever a Topic instance is sent in the response body these attributes will be omitted
        toJSON(){
            const ATTRIBUTES_TO_OMIT = [ "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

            let topic = this.get();

            ATTRIBUTES_TO_OMIT.forEach( (attribute) => {
                topic[attribute] = undefined;
            });

            return topic;
        }
    }

    Topic.init(
        /* ------------------------------- ATTRIBUTES ------------------------------- */
        {

            id: {
                type: DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                primaryKey: true
            },

            category_id : {
                type : DataTypes.UUID,
                allowNull : false
            },

            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique : true
            },

            description: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },

            thumbnail: {
                type: DataTypes.STRING(100),
            },

            pinned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            locked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            hidden: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            // created_at : { ... }
            // modified_at : { ... }
            // these two are added by sequelize ( see options object below )

            created_by: {
                type: DataTypes.STRING(50)
            },

            modified_by: {
                type: DataTypes.STRING(50),
            },

            created_ip: {
                type: DataTypes.INTEGER,
            },

            modified_ip: {
                type: DataTypes.INTEGER,
            }

        },

        //options
        {
            sequelize,
            createdAt : "created_at",
            updatedAt : "modified_at"
        }
    );

    return Topic;
};