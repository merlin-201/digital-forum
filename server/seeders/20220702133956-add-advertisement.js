'use strict';

const { faker } = require("@faker-js/faker");
const { v4 : uuidv4 } = require("uuid");

const getDate = (numOfDays = 0, endOfDay = false) => {
	let today = new Date();

	/*
	//building date string :
	let dateString = 
	`${today.getFullYear()}` + "-" +
	( today.getMonth() < 9 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}` ) + "-" +
	( today.getDate() < 10 ? `0${today.getDate() + 1}` : `${today.getDate() + 1}` );
	
	let d = new Date(dateString);
	*/

	let d = today;
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);

	d.setDate( d.getDate() + numOfDays);

	if(endOfDay){
		d.setSeconds( d.getSeconds() + 24*60*60 - 1 );
	}

	console.log(d);

	return d;
}

module.exports = {
  async up (queryInterface, Sequelize) {
	// following are some dummy advertisements :
    let randomAds = [
      {
        id: uuidv4(),
		name: "Ketto Donation",
		banner: "ketto.jpeg",
		banner_height: 250,
		banner_width: 970,
		target_url: "https://www.ketto.org/crowdfunding/fundraisers",
		start_date: getDate(-1),		// i.e today 00:00:00
		end_date: getDate(14, true),	//ends two weeks later
		section: "header",
		pages: JSON.stringify(["home", "topic"]),
		status : "pending",
		created_at : new Date(),
		modified_at : new Date()
      },
	  {
        id: uuidv4(),
		name: "Audible",
		banner: "audible.jpeg",
		banner_height: 600,
		banner_width: 300,
		target_url: "https://www.audible.in/?&source_code=IAARM1125112018000E/&gclid=EAIaIQobChMIvq-lm-2T9QIVLdxMAh33mgXFEAAYASAAEgLjlvD_BwE",
		start_date: getDate(-1),		// i.e today 00:00:00
		end_date: getDate(7, true),		//	ends one week later
		section: "sidebar",
		pages: JSON.stringify(["topic"]),
		status : "approved",
		created_at : new Date(),
		modified_at : new Date()
      },
	  {
        id: uuidv4(),
		name: " ICICI Prudential Life",
		banner: "icici.jpeg",
		banner_height: 250,
		banner_width: 300,
		target_url: "https://www.iciciprulife.com/term-insurance-plans/iprotect-smart-term-insurance-calculator.html",
		start_date: getDate(-14),		//started two weeks earlier
		end_date: getDate(-2, true),	// already ended
		section: "sidebar",
		pages: JSON.stringify(["home", "topic", "login", "register"]),
		status : "active",
		created_at : new Date(),
		modified_at : new Date()
      }
    ]

    await queryInterface.bulkInsert("advertisement", randomAds);

    console.log(randomAds.length, " dummy advertisements were pushed to DB");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("advertisement");
  }
};
