'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Institution Sponsorships', {
      institutionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Institutions',
          key: 'ID'
        },
        field: 'Institution ID'
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
      uncertain: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'Uncertain'
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Institution Sponsorships');
  }
};
