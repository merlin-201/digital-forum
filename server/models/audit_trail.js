'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	
	class AuditTrail extends Model {

		/* ------------------------------ associations ------------------------------ */
		static associate(models){
            // none
		}
	}

	AuditTrail.init(
		/* ------------------------------- attributes ------------------------------- */
		{

            id: {
                type: DataTypes.UUID,
                defaultValue : DataTypes.UUIDV4,
                primaryKey: true
            },

            actor_id: DataTypes.UUID,

            ip_address: DataTypes.STRING(30),

            action_type: DataTypes.STRING(20),

            action: DataTypes.STRING(150),

            status: DataTypes.STRING(20),
            
            source: DataTypes.STRING(50),

		},

		//options
		{
            sequelize,
            tableName: 'audit_trail',
            timestamps : true,  // enabling createdAt but disabling updatedAt
            createdAt : "timestamp",
            updatedAt : false
		}

	);

	return AuditTrail;
};