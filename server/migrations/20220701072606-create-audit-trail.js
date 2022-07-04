'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('audit_trail',
		{ 
			id: {
				type: Sequelize.UUID,
				primaryKey: true
			},

			actor_id: Sequelize.UUID,

			ip_address: Sequelize.STRING(30),

			action_type: Sequelize.STRING(20),

			action: Sequelize.STRING(150),

			status: Sequelize.STRING(20),
			
			source: Sequelize.STRING(50),

			timestamp : Sequelize.DATE

		});

	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('audit_trail');
	}
};
