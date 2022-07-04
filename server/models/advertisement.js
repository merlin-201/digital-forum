'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	class Advertisement extends Model {

		/* ------------------------------ associations ------------------------------ */
		static associate(models){
      		// none
		}

		// whenever a Category instance is sent in the response body these attributes will be omitted
		toJSON(){
			const ATTRIBUTES_TO_OMIT = [ "created_at", "created_by", "created_ip", "modified_at", "modified_by","modified_ip"]

			let advertisement = this.get();

			ATTRIBUTES_TO_OMIT.forEach( (attribute) => {
				advertisement[attribute] = undefined;
			});

			return advertisement;
		}
	}

	Advertisement.init(
		/* ------------------------------- attributes ------------------------------- */
		{

			id: {
				type: DataTypes.UUID,
				defaultValue : DataTypes.UUIDV4,
				primaryKey: true
			},

			name: {
				type: DataTypes.STRING(100),
				allowNull: false
			},

			banner: {
				type: DataTypes.STRING(200),
				allowNull: false
			},

			banner_height: {
				type: DataTypes.INTEGER,
			},

			banner_width: {
				type: DataTypes.INTEGER,
			},

			target_url: {
				type: DataTypes.STRING(200),
			},

			start_date: {
				type: DataTypes.DATE,
				allowNull : false,
				validate : {
					isAfterToday(value){	// minimum start date must be <tomorrow_date> 00:00:00
						const today = new Date();

						if( today > value )
							throw new Error("start date cannot be in the past");
					}
				}
			},

			end_date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate : {
					isAfterToday(value){
						const today = new Date();

						if( today > value )
							throw new Error("end date cannot be in the past");
					}
				}
			},

			section: {
				type: DataTypes.STRING(30),
				allowNull : false,
				validate : {	//validation so that only valid strings are stored in DB ( this are checked on the Sequelize level and not the DB/SQL level)
					isIn : {
					args : [ ["feed", "sidebar", "header", "footer"] ],
					msg : "invalid value for 'section' attribute."
					}
				}
			},

			pages: {
				type: DataTypes.JSON,
				allowNull : false,
				validate : {	//validation so that only valid strings are stored in DB
					checkArray(arr){
						const VALID_PAGE_NAMES = [ "home", "topic", "login", "register" ];

						if(!arr || arr.length === 0){
							throw new Error("'pages' attribute cannot be empty");
						}

						for( let pageName of arr ){
							if( !VALID_PAGE_NAMES.includes(pageName) ){
								throw new Error("invalid page name in 'pages' attribute");
							}
						}
					}
				},
				get : function(){
					let value = this.getDataValue("pages")
					console.log(value);
					console.log( typeof value);
					return (typeof value === 'object') ? value : JSON.parse( this.getDataValue("pages") || null );
				}
			},

			impressions: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},

			clicks: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},

			status: {
				type: DataTypes.STRING(30),
				allowNull: false,
				defaultValue: "pending",
				validate : {	//validation so that only valid strings are stored in DB
					isIn : {
					args : [ ["pending", "approved", "rejected", "active", "paused", "expired"] ],
					msg : 'Invalid value for "status" attribute.'
					}
				}
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

	return Advertisement;
};