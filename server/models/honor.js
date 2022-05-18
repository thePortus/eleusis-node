'use strict';
module.exports = function(sequelize, DataTypes) {
  var Honor = sequelize.define('Honor', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		honor: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Honor'
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Origin'
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Honors',
    classMethods: {
      associate: function(models) {
        Honor.belongsToMany(models.Institution, {
          as: 'Institutions',
          through: models['Institution Honor'],
          foreignKey: 'Honor ID',
          otherKey: 'Institution ID'
        });
        Honor.belongsToMany(models.Inscription, {
          as: 'Inscriptions',
          through: models['Honor in Inscription'],
          foreignKey: 'Honor ID',
          otherKey: 'Inscription ID'
        });
        Honor.belongsToMany(models.Person, {
          as: 'People',
          through: models['Person Honor Display'],
          foreignKey: 'Honor ID',
          otherKey: 'Person ID'
        });
      }
    }
  });
  Honor.removeAttribute('createdAt');
  Honor.removeAttribute('updatedAt');
  return Honor;
};
