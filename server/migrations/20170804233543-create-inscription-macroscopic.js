'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Inscriptions Macroscopic', {
      id: {
  			type: Sequelize.STRING,
  			allowNull: false,
  			primaryKey: true,
  			field: 'ID'
  		},
  		inscription: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Inscription'
  		},
  		date: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Date'
  		},
  		dateStrength: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Date Strength'
  		},
  		inscriptionType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Inscription Type'
  		},
  		objectType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Object Type'
  		},
  		altered: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Altered'
  		},
  		visuals: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Visuals'
  		},
  		textFormat: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Text Format'
  		},
  		sponsorType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Sponsor Type'
  		},
  		honorandType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Honorand Type'
  		}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Inscriptions Macroscopic');
  }
};
