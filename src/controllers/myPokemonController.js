const db = require("../db/models")

const getAllMyPokemon = async (req, res) => {
  try {
   const myPokemons = await db.myPokemon.findAll()

   return res.status(200).send({
      status: 200,
      message: 'Success Get All My Pokemon',
      data: myPokemons
   })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
    })
  }
}

module.exports = { getAllMyPokemon }