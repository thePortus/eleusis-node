'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inscription_Macroscopic = sequelize.define('Inscription Macroscopic', {
    id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Title'
		},
		date: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Date'
		},
		dateStrength: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Date Strength'
		},
		inscriptionType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Inscription Type'
		},
		objectType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Object Type'
		},
		altered: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Altered'
		},
		visuals: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Visuals'
		},
		textFormat: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Text Format'
		},
		sponsorType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Sponsor Type'
		},
		honorandType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Honorand Type'
		}
  }, {
    tableName: 'Inscriptions Macroscopic',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Inscription_Macroscopic.removeAttribute('createdAt');
  Inscription_Macroscopic.removeAttribute('updatedAt');
  return Inscription_Macroscopic;
};
