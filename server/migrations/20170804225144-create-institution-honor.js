'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Institution Honors', {
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
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Notes'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Institution Honors');
  }
};
