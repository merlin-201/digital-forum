'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('advertisement', {
			id: {
				type: Sequelize.UUID,
				defaultValue : Sequelize.UUIDV4,
				primaryKey: true
			},

			name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},

			banner: {
				type: Sequelize.STRING(200),
				allowNull: false
			},

			banner_height: {
				type: Sequelize.SMALLINT,
			},

			banner_width: {
				type: Sequelize.SMALLINT,
			},

			target_url: {
				type: Sequelize.STRING(300),
			},

			start_date: {
				type: Sequelize.DATE,
				allowNull : false
			},

			end_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},

			section: {
				type: Sequelize.STRING(30),
				allowNull: false
			},

			pages: {
				type: Sequelize.JSON,
				allowNull: false
			},

			impressions: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},

			clicks: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},

			status: {
				type: Sequelize.STRING(30),
				allowNull: false,
				defaultValue: "pending",
			},

			// created_at : { ... }
			// modified_at : { ... }
			// these two are added by sequelize ( see options object below )

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
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('advertisement');
	}
};