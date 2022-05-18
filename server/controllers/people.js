const Person = require('../models').Person;

module.exports = {
  create(req, res) {
    return Person
      .create({
        'ID': req.body.ID,
        'Person': req.body.Person,
        'Category': req.body.Category,
        'Origin': req.body.Origin,
        'Gender': req.body.Gender,
        'Athenian Citizen': req.body['Athenian Citizen'],
        'Roman Citizen': req.body['Roman Citizen'],
        'Family': req.body.Family,
        'Extended': req.body.Extended,
        'Praenomen': req.body.Praenomen,
        'Nomen': req.body.Nomen,
        'Cognomen': req.body.Cognomen,
        'Onomos': req.body.Onomos,
        'Patronym': req.body.Patronymn,
        'Deme': req.body.Deme,
        'Uncertain Person': req.body['Uncertain Person']
      })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Person
      .all()
      .then(people => res.status(200).send(people))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    const id = req.params.person_id;
    return Person
      .findById(id, { include: [{ all: true }]})
      .then(person => res.status(200).send(person))
      .catch(error => res.status(400).send(error));
  }
};
