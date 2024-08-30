const router = require("express").Router()
const { check, query } = require("express-validator")
const db = require('../db/models')
const catchPokemonController = require("../controllers/catchPokemonController")
const { Op } = require("sequelize")

router.get("/catch-pokemon", catchPokemonController.catchPokemon)
router.post(
  "/add-to-my-pokemon",
  [
    query("name")
      .isString()
      .withMessage("Invalid value")
      .notEmpty()
      .withMessage("Name wajib diisi"),
    check("username")
      .notEmpty().withMessage("Username wajib diisi")
      .matches(/^[A-Za-z0-9 ._]+$/).withMessage("Username hanya boleh huruf, angka, titik dan underscore")
      .custom(value => !/\s/.test(value)).withMessage("Username tidak boleh mengandung spasi")
      .custom(async (value, { req }) => {
         const username = await db.myPokemon.findOne({
             where: { 
                name: {
                    [Op.ne]: req.query.name
                },
                 username: {
                     [Op.iLike]: value
                 },
             }
         })

         if (username) {
           throw new Error('Username telah digunakan');
         }
     }),
  ],
  catchPokemonController.addToMyPokemonList
)

module.exports = router
