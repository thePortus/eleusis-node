'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Honors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'ID'
      },
      honor: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Honor'
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Origin'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Category'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Type'
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Honors');
  }
};
