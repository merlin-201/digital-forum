'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('category',
		{ 
			id: {
				type: Sequelize.UUID,
				defaultValue : Sequelize.UUIDV4,
				primaryKey: true
			},
	
			name: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique : true
			},
	
			description: {
				type: Sequelize.STRING(1000),
				allowNull: false
			},
	
			thumbnail: {
				type: Sequelize.STRING(100),
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
		await queryInterface.dropTable('category');
	}
};
