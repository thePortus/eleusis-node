'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inscription_Reference = sequelize.define('Inscription Reference', {
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
		publication: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'Publication'
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'Number'
		},
		additional: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Additional'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Inscription References',
    classMethods: {
      associate: function(models) {
        Inscription_Reference.belongsTo(models.Inscription, {
          foreignKey: 'Inscription ID',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  Inscription_Reference.removeAttribute('createdAt');
  Inscription_Reference.removeAttribute('updatedAt');
  return Inscription_Reference;
};
