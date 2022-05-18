'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inscription_Feature = sequelize.define('Inscription Feature', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		inscriptionId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Inscriptions',
				key: 'ID'
			},
			field: 'Inscription ID'
		},
		feature: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Feature'
		},
		uncertain: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Uncertain'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Inscription Features',
    classMethods: {
      associate: function(models) {
        Inscription_Feature.belongsTo(models.Inscription, {
          foreignKey: 'Inscription ID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  Inscription_Feature.removeAttribute('createdAt');
  Inscription_Feature.removeAttribute('updatedAt');
  return Inscription_Feature;
};
