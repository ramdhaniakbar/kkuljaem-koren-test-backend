const { validationResult } = require("express-validator")
const db = require("../db/models")

const releasePokemon = async (req, res) => {
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
    const genNumber = Math.floor(Math.random() * 100) + 1
    const isPrimeNumber = generateRandomPrime(genNumber)
    let message
    let myPokemon

    if (isPrimeNumber) {
      message = "You successfully release the Pokemon!"

      myPokemon = await db.myPokemon.findOne({
        where: { username: req.query.username },
      })
      if (!myPokemon) {
        return res.status(401).send({
          status: 401,
          message: "Pokemon is not found!",
        })
      }

      await db.myPokemon.destroy({ where: { username: req.query.username } })
    } else {
      message = "You fail, the Pokemon is not released!"
    }

    const data = {
      number: genNumber,
      is_prime_number: isPrimeNumber,
      my_pokemon: myPokemon,
    }

    return res.status(200).send({
      status: 200,
      message: message,
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

const isPrime = (num) => {
  if (num <= 1) return false
  if (num == 2 || num == 3) return true
  if (num % 2 == 0 || num % 3 == 0) return false

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i == 0 || num % (i + 2) == 0) return false
  }
  return true
}

const generateRandomPrime = (genNumber) => {
  let prime

  if (isPrime(genNumber)) {
    prime = true
  } else {
    prime = false
  }

  return prime
}

module.exports = { releasePokemon }
