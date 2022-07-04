'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('cron_log',
		{
			id: {
                type: Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey: true
            },

            ad_id: {
                type : Sequelize.UUID,
                allowNull : false
            },

            ad_name: {
                type: Sequelize.STRING(250)
            },

            ad_start_date: {
                type: Sequelize.DATE,
            },

            ad_end_date: {
                type: Sequelize.DATE
            },

            status_before: {
                type: Sequelize.STRING(30),
                allowNull: false
            },

            status_after: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
              
            action: {
                type: Sequelize.STRING(500),
                allowNull: false
            },

            timestamp : {
                type : Sequelize.DATE
            }
		});
	},

	async down (queryInterface, Sequelize) {

		await queryInterface.dropTable('cron_log');

	}
};
