'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('People Honor Displays', {
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'People',
          key: 'ID'
        },
        field: 'Person ID'
      },
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
      uncertain: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'Uncertain'
      },
      appearances: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Appearances'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('People Honor Displays');
  }
};
