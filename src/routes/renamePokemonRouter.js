const router = require("express").Router()
const { query } = require("express-validator")
const renamePokemonController = require("../controllers/renamePokemonController")

router.post(
  "/rename-pokemon",
  [
    query("username")
      .isString()
      .withMessage("Invalid value")
      .notEmpty()
      .withMessage("Username wajib diisi"),
  ],
  renamePokemonController.renamePokemon
)

module.exports = router
