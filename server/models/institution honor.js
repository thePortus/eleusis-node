'use strict';
module.exports = function(sequelize, DataTypes) {
  var Institution_Honor = sequelize.define('Institution Honor', {
    institutionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institutions',
        key: 'ID'
      },
      field: 'Institution ID'
    },
    honorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Honors',
        key: 'ID'
      },
      field: 'Honor ID'
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Notes'
    }
  }, {
    tableName: 'Institution Honors',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Institution_Honor.removeAttribute('createdAt');
  Institution_Honor.removeAttribute('updatedAt');
  return Institution_Honor;
};
