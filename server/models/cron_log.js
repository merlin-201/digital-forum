'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	class CronLog extends Model {

		/* ------------------------------ associations ------------------------------ */
		static associate(models){
            //none
		}
	}

	CronLog.init(
		/* ------------------------------- attributes ------------------------------- */
		{

            id: {
                type: DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                primaryKey: true
            },

            ad_id: {
                type : DataTypes.UUID,
                allowNull : false
            },

            ad_name: {
                type: DataTypes.STRING(250)
            },

            ad_start_date: {
                type: DataTypes.DATE,
            },

            ad_end_date: {
                type: DataTypes.DATE
            },

            status_before: {
                type: DataTypes.STRING(30),
                allowNull: false
            },

            status_after: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
              
            action: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
		},

		//options
		{
            sequelize,
            tableName: 'cron_log',
            timestamps : true,  // enabling createdAt but disabling updatedAt
            createdAt : "timestamp",
            updatedAt : false
		}

	);

	return CronLog;
};