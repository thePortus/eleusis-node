'use strict';
module.exports = function(sequelize, DataTypes) {
  var Institution_Sponsorship = sequelize.define('Institution Sponsorship', {
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
    uncertain: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'Uncertain'
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Notes'
    }
  }, {
    tableName: 'Institution Sponsorships',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Institution_Sponsorship.removeAttribute('createdAt');
  Institution_Sponsorship.removeAttribute('updatedAt');
  return Institution_Sponsorship;
};
