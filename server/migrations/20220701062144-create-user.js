'use strict';

module.exports = {
  	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('user',
		{ 
			id: {
                type: Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey: true
            },
    
            firstname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
    
            lastname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
    
            username : {
                type : Sequelize.STRING(50),
                unique : true,
                allowNull : false
            },
    
            email: {
                type: Sequelize.STRING(50),
                unique : true,
                allowNull : false
            },
    
            phone: {
                type: Sequelize.STRING(20)
            },
    
            password: {
                type: Sequelize.STRING(200)
            },
    
            secret: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
    
            created_by: {
                type: Sequelize.STRING(50)
            },
            
            modified_by: {
                type: Sequelize.STRING(50),
            },
    
            created_ip: {
                type: Sequelize.STRING(20),
            },
    
            modified_ip: {
                type: Sequelize.STRING(20),
            },

			created_at: {
				type : Sequelize.DATE,
				allowNull : false
			},

			modified_at: {
				type : Sequelize.DATE,
				allowNull : false
			}
		});

	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('user');
	}
};