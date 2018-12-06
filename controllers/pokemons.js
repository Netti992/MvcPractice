const express = require('express');
const pokemons = express();
const models = require('../models');

// index
pokemons.get('/', (req, res) => {
  models.Pokemon.findAll().then(pokemons => {
    res.locals.pokemons = pokemons;
    res.render('pokemons/index.handlebars');
  });
});

// new
pokemons.get('/new', (req, res) => {
  res.render('pokemons/new.handlebars');
});

// show
pokemons.get('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id)
    .then(pokemon => {
      if (!pokemon) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      res.locals.pokemon = pokemon;
      res.render('pokemons/show.handlebars');
    });
});

// delete
pokemons.delete('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id)
    .then(pokemon => {
      if (!pokemon) {
        return res.status(400).send('Nincs ilyen ID!');
      }
      models.Pokemon.destroy({
        where: {
          id: req.params.id}
      })
        .then(pokemon => {
          res.redirect(`/pokemons`);
        });
    });
});

// create
pokemons.post('/', (req, res) => {
  models.Pokemon.findOne(
    {where: {name: req.body.name}}
  )
    .then(pokemon => {
      if (pokemon) {
        return res.status(400).send('Van ilyen pokemon!');
      }
      models.Pokemon.create({
        name: req.body.name,
        type: req.body.type})
        .then(pokemon => {
          res.locals.pokemon = pokemon;
          res.redirect(`/pokemons`);
        });
    });
});

// update
pokemons.put('/:id', (req, res) => {
  models.Pokemon.update(req.body,
    {where: {id: req.params.id}
    })
    .then(pokemon => {
      res.redirect(`/pokemons/${req.params.id}`);
    });
});

// edit
pokemons.get('/:id/edit', (req, res) => {
  models.Pokemon.findById(req.params.id).then(pokemon => {
    res.locals.pokemon = pokemon;
    res.render('pokemons/edit.handlebars');
  });
});

module.exports = pokemons;
