'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('People', {
      id: {
  			type: Sequelize.INTEGER,
  			allowNull: false,
  			primaryKey: true,
  			field: 'ID'
  		},
  		person: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Person'
  		},
  		category: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Category'
  		},
  		origin: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Origin'
  		},
  		gender: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Gender'
  		},
  		athenianCitizen: {
  			type: Sequelize.BOOLEAN,
  			allowNull: true,
  			field: 'Athenian Citizen'
  		},
  		romanCitizen: {
  			type: Sequelize.BOOLEAN,
  			allowNull: true,
  			field: 'Roman Citizen'
  		},
  		family: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Family'
  		},
  		extended: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Extended'
  		},
  		praenomen: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Praenomen'
  		},
  		nomen: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Nomen'
  		},
  		cognomen: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Cognomen'
  		},
  		onomos: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Onomos'
  		},
  		patronym: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Patronym'
  		},
  		deme: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Deme'
  		},
  		uncertainPerson: {
  			type: Sequelize.BOOLEAN,
  			allowNull: true,
  			field: 'Uncertain Person'
  		}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('People');
  }
};
