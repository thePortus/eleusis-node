'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person_Honor_Display = sequelize.define('Person Honor Display', {
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'People',
        key: 'ID'
      },
      field: 'Person ID'
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
    inscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Inscriptions',
        key: 'ID'
      },
      field: 'Inscription ID'
    },
    uncertain: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'Uncertain'
    },
    appearances: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'Appearances'
    }
  }, {
    tableName: 'People Honor Displays',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Person_Honor_Display.removeAttribute('createdAt');
  Person_Honor_Display.removeAttribute('updatedAt');
  return Person_Honor_Display;
};
