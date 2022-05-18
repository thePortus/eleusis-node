'use strict';
module.exports = function(sequelize, DataTypes) {
  var Inscription = sequelize.define('Inscription', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		ie: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'IE'
		},
		inscription: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Inscription'
		},
		objectType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Object Type'
		},
		inscriptionType: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Inscription Type'
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Location'
		},
		lowDate: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'Low Date'
		},
		highDate: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'High Date'
		},
		date: {
			type: DataTypes.REAL,
			allowNull: true,
			field: 'Date'
		},
		dateSpan: {
			type: DataTypes.REAL,
			allowNull: true,
			field: 'Date Span'
		},
		lowDateUncertain: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Low Date Uncertain'
		},
		highDateUncertain: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'High Date Uncertain'
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Notes'
		}
  }, {
    tableName: 'Inscriptions',
    classMethods: {
      associate: function(models) {
        Inscription.hasMany(models['Inscription Reference'], {
          foreignKey: 'Inscription ID',
          as: 'References'
        });
        Inscription.hasMany(models['Inscription Feature'], {
          foreignKey: 'Inscription ID',
          as: 'Features'
        });
        Inscription.belongsToMany(models.Honor, {
          as: 'Honors',
          through: models['Honor in Inscription'],
          foreignKey: 'Inscription ID',
          otherKey: 'Honor ID'
        });
        Inscription.belongsToMany(models.Institution, {
          as: 'Institutions',
          through: models['Institution Sponsorship'],
          foreignKey: 'Inscription ID',
          otherKey: 'Institution ID'
        });
        Inscription.belongsToMany(models.Person, {
          as: 'People',
          through: models['Person in Inscription'],
          foreignKey: 'Inscription ID',
          otherKey: 'Person ID'
        });
      }
    }
  });
  Inscription.removeAttribute('createdAt');
  Inscription.removeAttribute('updatedAt');
  return Inscription;
};
