
const express = require('express');
const notesRouter=express.Router()

const pokemonModel = require('./PokemonSchema.js');

const pokemonRouter = express.Router();


pokemonRouter.post('/create', async (req, res) => {
  try {
    const { name, sprite, types } = req.body;
    if (!name || !types || types.length === 0) {
      return res.status(400).send({ message: 'Name and types are required' });
    }

    
    if (!Array.isArray(types)) {
      return res.status(400).send({ message: 'Types should be an array of strings' });
    }

    const newPokemon = new pokemonModel({
      name,
      sprite,
      types
    });
    const savedPokemon = await newPokemon.save();
    res.status(201).send({
      name: savedPokemon.name,
      sprite: savedPokemon.sprite,
      types: savedPokemon.types
    });
  } catch (error) {
    res.status(500).send({ message: 'Error creating Pokemon', error });
  }
});


pokemonRouter.get('/getdata', async (req, res) => {
  try {
    const pokemonList = await pokemonModel.find();
    res.status(200).send(pokemonList);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Pokémon data', error });
  }
});


module.exports=pokemonRouter