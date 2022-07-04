'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	class Vote extends Model {

		/* ------------------------------ associations ------------------------------ */
		static associate(models){

            this.belongsTo( models.Post, {
                foreignKey : "post_id",
                as : "post"
            });

            this.belongsTo( models.User, {
                foreignKey : "user_id",
                as : "user"
            });
		}
	}

	Vote.init(
		/* ------------------------------- attributes ------------------------------- */
		{
            post_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },

            vote: {
                type: DataTypes.SMALLINT,
                allowNull: false
            }

            // created_at : { ... }
            // modified_at : { ... }
            // these two are added by sequelize ( see options object below )

		},
		//options
		{
            sequelize,
            createdAt : "created_at",
            updatedAt : "modified_at"
		}

	);

	return Vote;
};