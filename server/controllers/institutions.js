const Institution = require('../models').Institution;
const Honor = require('../models').Honor;
const Inscription = require('../models').Inscription;

module.exports = {
  create(req, res) {
    return Institution
      .create({
        'ID': req.body.ID,
        'Institution': req.body.Institution,
        'Origin': req.body.Origin,
        'Type': req.body.Type,
        'Category': req.body.Category,
        'Notes': req.body.Notes,
      })
      .then(institution => res.status(201).send(institution))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Institution
      .all()
      .then(institutions => res.status(200).send(institutions))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    const id = req.params.institution_id;
    return Institution
      .findById(id, { include: [{ all: true }]})
      .then(institution => res.status(200).send(institution))
      .catch(error => res.status(400).send(error));
  }
};
