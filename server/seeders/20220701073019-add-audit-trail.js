'use strict';

const { faker } = require("@faker-js/faker");
const { v4 : uuidv4 } = require("uuid");

const getRandomAuditTrail = () => {

  let ACTION_TYPES = ["CREATE", "UPDATE", "DELETE", "READ"];
  let STATUSES = ["SUCCESS", "FAILED"];
  let SOURCES = ["USER", "DATABASE", "ADMIN", "SYSTEM" ];

  let getRandomElement = (arr) => arr[ Math.floor( Math.random() * arr.length )];

  return { 
    id : uuidv4(),
    timestamp : faker.date.recent(90),
    actor_id : uuidv4(),
    ip_address : faker.internet.ipv4(),
    action_type : getRandomElement(ACTION_TYPES), // get random action_type string
    action : faker.lorem.sentence(6),
    status : getRandomElement(STATUSES),
    source : getRandomElement(SOURCES),
  }

};

module.exports = {
  async up (queryInterface, Sequelize) {
    let numOfAuditTrails = 20;
    let randomAuditTrails = [];

    for(let i=0; i< numOfAuditTrails; i++){
      randomAuditTrails.push( getRandomAuditTrail() );
    }

    await queryInterface.bulkInsert("audit_trail", randomAuditTrails);

    console.log(randomAuditTrails.length, " audit trails were pushed to DB");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("audit_trail");
  }
};
