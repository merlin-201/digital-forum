'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	class Category extends Model {

		/* ------------------------------ associations ------------------------------ */
		static associate(models){

			// one to many association with Topic model i.e 1 Category : N Topics
			this.hasMany( models.Topic, {
				foreignKey : "category_id",
				onDelete : "CASCADE",
				as : "topics"
			});
		}

		// whenever a Category instance is sent in the response body these attributes will be omitted
		toJSON(){
			const ATTRIBUTES_TO_OMIT = [ "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

			let category = this.get();

			ATTRIBUTES_TO_OMIT.forEach( (attribute) => {
				category[attribute] = undefined;
			});

			return category;
		}
	}

	Category.init(
		/* ------------------------------- attributes ------------------------------- */
		{

		id: {
			type: DataTypes.UUID,
			defaultValue : DataTypes.UUIDV4,
			primaryKey: true
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

	return Category;
};