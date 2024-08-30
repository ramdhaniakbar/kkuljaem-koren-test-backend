const router = require("express").Router()
const myPokemonController = require("../controllers/myPokemonController")

router.get(
  "/my-pokemon",
  myPokemonController.getAllMyPokemon
)

module.exports = router
