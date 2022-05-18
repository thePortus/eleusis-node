'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Institutions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'ID'
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Institution'
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Origin'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Type'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Category'
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Institutions');
  }
};
