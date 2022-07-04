'use strict';

module.exports = {
  	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('vote',
		{ 

            post_id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
				references : {
					model : "post",
					key : "id"
				}
            },

            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
				references : {
					model : "user",
					key : "id"
				}
            },

            vote: {
                type: Sequelize.SMALLINT,
                allowNull: false
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
		await queryInterface.dropTable('vote');
	}
};