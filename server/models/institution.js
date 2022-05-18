'use strict';
module.exports = function(sequelize, DataTypes) {
  var Institution = sequelize.define('Institution', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		institution: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Institution'
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Origin'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Type'
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Institutions',
    classMethods: {
      associate: function(models) {
        Institution.belongsToMany(models.Honor, {
          as: 'Offices',
          through: models['Institution Honor'],
          foreignKey: 'Institution ID',
          otherKey: 'Honor ID'
        });
        Institution.belongsToMany(models.Inscription, {
          as: 'Inscriptions',
          through: models['Institution Sponsorship'],
          foreignKey: 'Institution ID',
          otherKey: 'Inscription ID'
        });
      }
    }
  });
  Institution.removeAttribute('createdAt');
  Institution.removeAttribute('updatedAt');
  return Institution;
};
