'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {

        /* ------------------------------ ASSOCIATIONS ------------------------------ */
        static associate(models){

            // one to many association with Post model i.e 1 user : N posts
            this.hasMany( models.Post, {
                foreignKey : "user_id",
                onDelete : "CASCADE",
                //as : "posts"
            });

            // one to one association with Post model i.e 1 user : 1 post
            this.hasOne( models.Post, {
                foreignKey : "tagged_user_id",
                as : "tagged_user"
            });

            this.hasMany( models.Vote, {
                foreignKey : "user_id"
            });
        
        }

        // whenever a User instance is sent in the response body these attributes will be omitted
        toJSON(){
            const ATTRIBUTES_TO_OMIT = [ "secret", "password", "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

            let user = this.get();

            ATTRIBUTES_TO_OMIT.forEach( (attribute) => {
                user[attribute] = undefined;
            });

            return user;
        }
    }

    User.init(
        /* ------------------------------- ATTRIBUTES ------------------------------- */
        {

            id: {
                type: DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                primaryKey: true
            },
    
            firstname: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
    
            lastname: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
    
            username : {
                type : DataTypes.STRING(50),
                unique : true,
                allowNull : false
            },
    
            email: {
                type: DataTypes.STRING(50),
                unique : true,
                allowNull : false
            },
    
            phone: {
                type: DataTypes.STRING(20)
            },
    
            password: {
                type: DataTypes.STRING(200)
            },
    
            secret: {
                type: DataTypes.STRING(100),
                allowNull: false
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

    return User;
};