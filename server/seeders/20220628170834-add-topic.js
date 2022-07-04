'use strict';
const { v4 : uuidv4 } = require("uuid");

module.exports = {
  async up (queryInterface, Sequelize) {
    let categories = await queryInterface.select(null, "category");
    let categoryId1 = categories.filter( (cat) => cat.name === "Stocks" )[0].id;
    let categoryId2 = categories.filter( (cat) => cat.name === "Cryptocurrency" )[0].id;
    let categoryId3 = categories.filter( (cat) => cat.name === "Mutual Funds" )[0].id;

    await queryInterface.bulkInsert("topic", [
      {
        id: uuidv4(),
        category_id: categoryId1,
        name: "IRCTC",
        description: "Can I buy IRCTC, Should I buy IRCTC, Do I buy IRCTC? Discuss all your queries related to IRCTC stocks right here",
        thumbnail: "irctc.jpeg",
        created_at : new Date(),
        modified_at : new Date()
      },
      {
        id: uuidv4(),
        category_id: categoryId1,
        name: "Gamestop",
        description: "Can I buy Gamestop, Should I buy Gamestop, Do I buy Gamestop? Discuss all your queries related to Gamestop stocks here",
        thumbnail: "gamestop.jpeg",
        created_at : new Date(),
        modified_at : new Date()
      },
      {
        id: uuidv4(),
        category_id: categoryId2,
        name: "Bitcoin",
        description: "Can I buy Bitcoin, Should I buy Bitcoin, Do I buy Bitcoin? Discuss all your queries related to the most popular cryptocurrency here.",
        thumbnail: "bitcoin.jpeg",
        created_at : new Date(),
        modified_at : new Date()
      },
      {
        id: uuidv4(),
        category_id: categoryId2,
        name: "Ethereum",
        description: "Can I buy Ethereum, Should I buy Ethereum, Do I buy Ethereum? Discuss all your queries about Etheruem here",
        thumbnail: "ethereum.jpeg",
        created_at : new Date(),
        modified_at : new Date()
      },
      {
        id: uuidv4(),
        category_id: categoryId3,
        name: "TATA Large Cap Fund",
        description: "Fund has 98.08% investment in indian stocks of which 78.36% is in large cap stocks, 7.09% is in mid cap stocks, 3.47% in small cap stocks.",
        thumbnail: "tata.jpeg",
        created_at : new Date(),
        modified_at : new Date()
      }
    ]);

    console.log(5, " topics were pushed to DB");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topic");
  }
};
