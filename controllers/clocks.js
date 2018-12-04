const express = require('express');
const clocks = express();
const models = require('../models');

// index
clocks.get('/', (req, res) => {
  models.Clock.findAll().then(clocks => {
    res.locals.clocks = clocks;
    res.render('clocks/index.handlebars');
  });
});

// show
clocks.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id)
    .then(clock => {
      if (!clock) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      res.locals.clock = clock;
      res.render('clocks/show.handlebars');
    });
});

// delete
clocks.delete('/:id', (req, res) => {
  models.Clock.findById(req.params.id)
    .then(clock => {
      if (!clock) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      models.Clock.destroy({
        where: {
          id: req.params.id}
      })
        .then(clock => {
          res.redirect(`/clocks`);
        });
    });
});

// create
clocks.post('/', (req, res) => {
  models.Clock.findOne(
    {where: {name: req.body.name}}
  )
    .then(clock => {
      if (clock) {
        return res.status(400).send('Van ilyen óra!');
      }
      models.Clock.create({
        name: req.body.name,
        type: req.body.type})
        .then(clock => {
          res.locals.clock = clock;
          res.render('clocks/show.handlebars');
        });
    });
});

// update
clocks.put('/:id', (req, res) => {
  models.Clock.update(req.body,
    {where: {id: req.params.id}
    })
    .then(clock => {
      res.redirect(`/clocks/${req.params.id}`);
    });
});

// edit
clocks.get('/:id/edit', (req, res) => {
  models.Clock.findById(req.params.id)
    .then(clock => {
      res.locals.clock = clock;
      res.render('clocks/edit.handlebars');
    });
});

module.exports = clocks;
