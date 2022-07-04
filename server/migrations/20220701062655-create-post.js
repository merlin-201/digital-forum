'use strict';

module.exports = {
  	async up (queryInterface, Sequelize) {

		await queryInterface.createTable('post',
		{ 
			id: {
                type: Sequelize.UUID,
                defaultValue : Sequelize.UUIDV4,
                primaryKey: true
            },

            topic_id: {
                type : Sequelize.UUID,
                allowNull : false,
				references : {
					model : "topic",
					key : "id"
				}
            },

            user_id: {
                type : Sequelize.UUID,
                allowNull : false,
				references : {
					model : "user",
					key : "id"
				}
            },

            tagged_user_id: {
                type : Sequelize.UUID,
                references : {
					model : "user",
					key : "id"
				}
            },

            text: {
                type: Sequelize.TEXT,
                allowNull : false
            },

            image: {
                type: Sequelize.STRING(100)
            },

            video_link: {
                type: Sequelize.STRING(200)
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
		await queryInterface.dropTable('post');
	}
};
