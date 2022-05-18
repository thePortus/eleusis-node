const Inscription = require('../models').Inscription;

module.exports = {
  create(req, res) {
    return Inscription
      .create({
        'ID': req.body.ID,
        'IE': req.body.IE,
        'Inscription': req.body.Inscription,
        'Object Type': req.body['Object Type'],
        'Inscription Type': req.body['Inscription Type'],
        'Location': req.body.Location,
        'Low Date': req.body['Low Date'],
        'High Date': req.body['High Date'],
        'Date': req.body.Date,
        'Date Span': req.body['Date Span'],
        'Low Date Uncertain': req.body['Low Date Uncertain'],
        'High Date Uncertain': req.body['High Date Uncertain'],
        'Notes': req.body.Notes,
      })
      .then(inscriptions => res.status(201).send(inscriptions))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Inscription
      .findAll()
      .then(inscriptions => res.status(200).send(inscriptions))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    const id = req.params.inscription_id;
    return Inscription
      .findById(id, { include: [{ all: true }]})
      .then(inscription => res.status(200).send(inscription))
      .catch(error => res.status(400).send(error));
  }
};
