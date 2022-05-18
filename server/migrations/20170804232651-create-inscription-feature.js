'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Inscription Features', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'ID'
      },
      inscriptionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Inscriptions',
          key: 'ID'
        },
        field: 'Inscription ID'
      },
      feature: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Feature'
      },
      uncertain: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Uncertain'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Inscription Features');
  }
};
