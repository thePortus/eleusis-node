'use strict';
module.exports = function(sequelize, DataTypes) {
  var Honor_in_Inscription = sequelize.define('Honor in Inscription', {
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
		appearances: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Appearances'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Honors in Inscriptions',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Honor_in_Inscription.removeAttribute('createdAt');
  Honor_in_Inscription.removeAttribute('updatedAt');
  return Honor_in_Inscription;
};
