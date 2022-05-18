'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person_in_Inscription = sequelize.define('Person in Inscription', {
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
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Role'
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Notes'
    }
  }, {
    tableName: 'Persons in Inscriptions',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Person_in_Inscription.removeAttribute('createdAt');
  Person_in_Inscription.removeAttribute('updatedAt');
  return Person_in_Inscription;
};
