'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Honors in Inscriptions', {
      honorId: {
  			type: Sequelize.INTEGER,
  			allowNull: false,
        primaryKey: true,
  			references: {
  				model: 'Honors',
  				key: 'ID'
  			},
  			field: 'Honor ID'
  		},
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
  		appearances: {
  			type: Sequelize.INTEGER,
  			allowNull: true,
  			field: 'Appearances'
  		},
  		notes: {
  			type: Sequelize.STRING,
  			allowNull: true,
  			field: 'Notes'
  		}
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Honors in Inscriptions');
  }
};
