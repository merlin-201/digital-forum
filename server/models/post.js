'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Post extends Model {

        /* ------------------------------ ASSOCIATIONS ------------------------------ */

        static associate(models){

            // many to one association with Topic model i.e N posts : 1 topic
            this.belongsTo( models.Topic, {
                foreignKey : "topic_id",
                onDelete : "CASCADE",
                as : "topic"
            });

            // many to one association with User model i.e N posts : 1 user
            this.belongsTo( models.User, {
                foreignKey : "user_id",
                onDelete : "CASCADE",
                as : "user"
            });

            // tagged_user
            this.belongsTo( models.User, {
                foreignKey : "tagged_user_id",
                as : "tagged_user"
            });

            this.hasMany( models.Vote, {
                foreignKey : "post_id"
            });
            
        }

        // whenever a User instance is sent in the response body these attributes will be omitted
        toJSON(){
            const ATTRIBUTES_TO_OMIT = ["created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

            let post = this.get();

            ATTRIBUTES_TO_OMIT.forEach( (attribute) => {
                post[attribute] = undefined;
            });

            return post;
        }
    }

    Post.init(
        /* ------------------------------- ATTRIBUTES ------------------------------- */
        {

            id: {
                type: DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                primaryKey: true
            },

            topic_id: {
                type : DataTypes.UUID,
                allowNull : false
            },

            user_id: {
                type : DataTypes.UUID,
                allowNull : false
            },

            tagged_user_id: {
                type : DataTypes.UUID
            },

            text: {
                type: DataTypes.TEXT,
                allowNull : false
            },

            image: {
                type: DataTypes.STRING(100)
            },

            video_link: {
                type: DataTypes.STRING(200)
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

    return Post;
};