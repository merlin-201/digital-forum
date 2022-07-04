'use strict';

const { faker } = require("@faker-js/faker");
const { v4 : uuidv4 } = require("uuid");

const getRandomUser = () => {
  let randomFirstName = faker.name.firstName();
  let randomLastName = faker.name.lastName();

  return { 
    id : uuidv4(),
    firstname : randomFirstName,
    lastname : randomLastName,
    username : faker.internet.userName( randomFirstName, randomLastName ).toLowerCase(),
    email : faker.internet.email( randomFirstName ).toLowerCase(),
    phone : faker.phone.number('##########'),
    secret : "RANDOMSECRET",
    created_at : new Date(),
    modified_at : new Date()
  }
};

module.exports = {
  async up (queryInterface, Sequelize) {
    let numOfUsers = 10;
    let randomUsers = [];

    for(let i=0; i< numOfUsers; i++){
      randomUsers.push( getRandomUser() );
    }

    await queryInterface.bulkInsert("user", randomUsers);

    console.log(randomUsers.length, " users were pushed to DB");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user");
  }
};
