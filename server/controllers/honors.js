const Honor = require('../models').Honor;

module.exports = {
  create(req, res) {
    return Honor
      .create({
        'ID': req.body.ID,
        'Honor': req.body.Honor,
        'Origin': req.body.Origin,
        'Category': req.body.Category,
        'Type': req.body.Type,
        'Notes': req.body.Notes,
      })
      .then(honor => res.status(201).send(honor))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Honor
      .all()
      .then(honors => res.status(200).send(honors))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    const id = req.params.honor_id;
    return Honor
      .findById(id, { include: [{ all: true }]})
      .then(honor => res.status(200).send(honor))
      .catch(error => res.status(400).send(error));
  }
};
