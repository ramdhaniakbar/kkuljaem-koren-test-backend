const router = require("express").Router()
const { query } = require("express-validator")
const releasePokemonController = require("../controllers/releasePokemonController")

router.post(
  "/release-pokemon",
  query("username")
    .isString()
    .withMessage("Invalid value")
    .notEmpty()
    .withMessage("Username wajib diisi"),
  releasePokemonController.releasePokemon
)

module.exports = router
