'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Persons in Inscriptions', {
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
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Role'
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Persons in Inscriptions');
  }
};
