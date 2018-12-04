const express = require('express');
const videogames = express();
const models = require('../models');

// index
videogames.get('/', (req, res) => {
  models.Videogame.findAll()
    .then(videogames => {
      res.locals.videogames = videogames;
      res.render('videogames/index.handlebars');
    });
});

// show
videogames.get('/:id', (req, res) => {
  models.Videogame.findById(req.params.id)
    .then(videogame => {
      if (!videogame) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      res.locals.videogame = videogame;
      res.render('videogames/show.handlebars');
    });
});

// delete
videogames.delete('/:id', (req, res) => {
  models.Videogame.findById(req.params.id)
    .then(videogame => {
      if (!videogame) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      models.Videogame.destroy({
        where: {
          id: req.params.id}
      })
        .then(videogame => {
          res.redirect(`/videogames`);
        });
    });
});

// create
videogames.post('/', (req, res) => {
  models.Videogame.findOne(
    {where: {name: req.body.name}}
  )
    .then(videogame => {
      if (videogame) {
        return res.status(400).send('Van ilyen játék!');
      }
      models.Videogame.create({
        name: req.body.name,
        type: req.body.type})
        .then(videogame => {
          res.locals.videogame = videogame;
          res.render('videogames/show.handlebars');
        });
    });
});

// update
videogames.put('/:id', (req, res) => {
  models.Videogame.update(req.body,
    {where: {id: req.params.id}
    })
    .then(videogame => {
      res.redirect(`/videogames/${req.params.id}`);
    });
});

// edit
videogames.get('/:id/edit', (req, res) => {
  models.Videogame.findById(req.params.id)
    .then(videogame => {
      res.locals.videogame = videogame;
      res.render('videogames/edit.handlebars');
    });
});

module.exports = videogames;
