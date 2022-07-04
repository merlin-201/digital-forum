'use strict';

module.exports = {
  	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('topic',
		{ 
			id: {
				type: Sequelize.UUID,
				defaultValue : Sequelize.UUIDV4,
				primaryKey: true
			},

			category_id : {
				type : Sequelize.UUID,
				allowNull : false,
				references : {
					model : "category",
					key : "id"
				}
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

			pinned: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},

			locked: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},

			hidden: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
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
		await queryInterface.dropTable('topic');
	}
};
