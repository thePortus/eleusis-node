'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Inscriptions', {
      id: {
  			type: Sequelize.INTEGER,
  			allowNull: false,
  			primaryKey: true,
  			field: 'ID'
  		},
  		ie: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'IE'
  		},
  		inscription: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Inscription'
  		},
  		objectType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Object Type'
  		},
  		inscriptionType: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Inscription Type'
  		},
  		location: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Location'
  		},
  		lowDate: {
  			type: Sequelize.INTEGER,
  			allowNull: true,
  			field: 'Low Date'
  		},
  		highDate: {
  			type: Sequelize.INTEGER,
  			allowNull: true,
  			field: 'High Date'
  		},
  		date: {
  			type: Sequelize.REAL,
  			allowNull: true,
  			field: 'Date'
  		},
  		dateSpan: {
  			type: Sequelize.REAL,
  			allowNull: true,
  			field: 'Date Span'
  		},
  		lowDateUncertain: {
  			type: Sequelize.BOOLEAN,
  			allowNull: true,
  			field: 'Low Date Uncertain'
  		},
  		highDateUncertain: {
  			type: Sequelize.BOOLEAN,
  			allowNull: true,
  			field: 'High Date Uncertain'
  		},
  		notes: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Notes'
  		}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Inscriptions');
  }
};
