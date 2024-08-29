const { validationResult } = require("express-validator")
const db = require("../db/models")

const renamePokemon = async (req, res) => {
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
    const myPokemon = await db.myPokemon.findOne({
      where: { username: req.query.username },
    })

    if (!myPokemon) {
      return res.status(401).send({
        status: 401,
        message: "Pokemon is not found!",
      })
    }

    let splitName
    let nextFibonacci
    if (myPokemon.is_renamed) {
      splitName = myPokemon.name.split("-")
      nextFibonacci = getNextFibonacci(splitName[1])

      if (splitName[1] == "0" && !myPokemon.number_one_is_out) {
        await db.myPokemon.update({
          name: splitName[0] + "-" + 1,
        }, { where: { username: req.query.username } })

      } else if (splitName[1] == "1" && !myPokemon.number_one_is_out) {
        await db.myPokemon.update({
          name: splitName[0] + "-" + 1,
          number_one_is_out: true,
        }, { where: { username: req.query.username } })

      } else {
         await db.myPokemon.update({
            name: splitName[0] + "-" + nextFibonacci,
            number_one_is_out: true,
          }, { where: { username: req.query.username } })
      }
    } else {
      await db.myPokemon.update({
        name: myPokemon.name + "-" + 0,
        is_renamed: true,
      }, { where: { username: req.query.username } })
    }

    await myPokemon.reload()

    const data = {
      next_fibonacci: nextFibonacci,
      my_pokemon: myPokemon
    }

    return res.status(200).send({
      status: 200,
      message: "Rename Pokemon!",
      data: data,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
    })
  }
}

const getNextFibonacci = (prevFib) => {
  if (prevFib === 0) return 1

  let a = 0,
    b = 1

  while (b <= prevFib) {
    const next = a + b
    a = b
    b = next
  }

  return b
}

module.exports = { renamePokemon }
