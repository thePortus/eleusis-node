'use strict';
module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ID'
		},
		person: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Person'
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Category'
		},
		origin: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Origin'
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Gender'
		},
		athenianCitizen: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Athenian Citizen'
		},
		romanCitizen: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Roman Citizen'
		},
		family: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Family'
		},
		extended: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Extended'
		},
		praenomen: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Praenomen'
		},
		nomen: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Nomen'
		},
		cognomen: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Cognomen'
		},
		onomos: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Onomos'
		},
		patronym: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Patronym'
		},
		deme: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Deme'
		},
		uncertainPerson: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			field: 'Uncertain Person'
		}
  }, {
    tableName: 'People',
    classMethods: {
      associate: function(models) {
        Person.belongsToMany(models.Inscription, {
          as: 'Inscriptions',
          through: models['Person in Inscription'],
          foreignKey: 'Person ID',
          otherKey: 'Inscription ID'
        });
        Person.belongsToMany(models.Honor, {
          as: 'Honors',
          through: models['Person Honor Display'],
          foreignKey: 'Person ID',
          otherKey: 'Honor ID'
        });
      }
    }
  });
  Person.removeAttribute('createdAt');
  Person.removeAttribute('updatedAt');
  return Person;
};
