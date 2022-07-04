"use strict";
const { v4 : uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");


module.exports = {

	async up(queryInterface, Sequelize) {
		let users = (await queryInterface.sequelize.query("SELECT id FROM user"))[0];
		let topics = (await queryInterface.sequelize.query("SELECT id FROM topic"))[0];

		let userIds = users.map( (obj) => obj.id );
		let topicIds = topics.map( (obj) => obj.id );

		let randomPosts = [];

		// for each topic we will create 5 posts with random user
		topicIds.forEach( (topicId) => {

			for( let i=0; i<5; i++){
				let newPost = {
					id : uuidv4(),
					text : faker.lorem.paragraph( 3, ""),
					topic_id : topicId,
					user_id : userIds[ Math.floor(Math.random() * userIds.length) ], //get random userId from userIds array
					created_at : new Date(),
					modified_at : new Date()
				};

				randomPosts.push(newPost);
			}
		});

		await queryInterface.bulkInsert("post", randomPosts);
		console.log( randomPosts.length," posts were pushed");

	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("post");
	},
};
