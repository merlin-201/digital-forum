'use strict';
const { v4 : uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert("category", [
		{
			id: uuidv4(),
			name:"Stocks",
			description: "A Category to discuss stocks",
			thumbnail: "stocks.jpeg",
			created_at : new Date(),
			modified_at : new Date()
		},
		{
			id: uuidv4(),
			name:"Cryptocurrency",
			description:"A category to discuss trading strategies on trending cryptocurrencies.",
			thumbnail:"cryptocurrency.jpeg",
			created_at : new Date(),
			modified_at : new Date()
		},
		{
			id: uuidv4(),
			name:"Mutual Funds",
			description:"Ask all your queries related to Mutual Funds and EPFs here.",
			thumbnail:"mutual-funds.jpeg",
			created_at : new Date(),
			modified_at : new Date()
		}
    ]);

    console.log(3," categories were pushed to DB");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("category");
  }
};

