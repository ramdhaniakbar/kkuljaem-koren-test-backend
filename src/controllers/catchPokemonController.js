const { validationResult } = require("express-validator")
const db = require("../db/models")

const catchPokemon = async (req, res) => {
  try {
    const mathRandom = Math.random()
    let isSuccess
    let message

    if (mathRandom < 0.5) {
      isSuccess = true
      message = "You successfully caught the Pokémon!"
    } else {
      isSuccess = false
      message = "You fail, the Pokémon escaped!"
    }

    return res.status(200).send({
      status: 200,
      message: message,
      data: {
        is_success: isSuccess,
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
    })
  }
}

const addToMyPokemonList = async (req, res) => {
  // ---- Validation
  const validate = validationResult(req)
  if (!validate.isEmpty()) {
    return res.status(400).send({
      status: 400,
      message: validate.errors[0]["msg"],
      error: validate.errors,
    })
  }
  try {
    const myPokemon = await db.myPokemon.create({
      name: req.query.name,
      username: req.body.username,
      image: `https://img.pokemondb.net/artwork/${req.query.name}.jpg`,
      is_renamed: false,
      number_one_is_out: false,
    })

    return res.status(201).send({
      status: 201,
      message: "Successfully added to my pokemon list!",
      data: myPokemon,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
    })
  }
}

module.exports = { catchPokemon, addToMyPokemonList }
