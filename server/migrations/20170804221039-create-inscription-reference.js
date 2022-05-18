'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Inscription References', {
      inscriptionId: {
  			type: Sequelize.INTEGER,
  			allowNull: false,
  			primaryKey: true,
  			references: {
  				model: 'Inscriptions',
  				key: 'ID'
  			},
  			field: 'Inscription ID'
  		},
  		publication: {
  			type: Sequelize.STRING,
  			allowNull: false,
  			primaryKey: true,
  			field: 'Publication'
  		},
  		number: {
  			type: Sequelize.STRING,
  			allowNull: false,
  			primaryKey: true,
  			field: 'Number'
  		},
  		additional: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Additional'
  		},
  		notes: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Notes'
  		}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Inscription References');
  }
};
