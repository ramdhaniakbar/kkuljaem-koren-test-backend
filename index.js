require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const port = process.env.APP_PORT || 8001

// Server
try {
   app.listen(port, () => {
      console.log(`server is running on port ${port}`);
   })
} catch (error) {
   console.log(`Error occured: ${error.message}`);
}

app.get('/', (req, res) => {
   res.json({
      message: 'kkuljaem backend api'
   })
})

const catchPokemonRouter = require('./src/routes/catchPokemonRouter')
const releasePokemonRouter = require('./src/routes/releasePokemonRouter')
const renamePokemonRouter = require('./src/routes/renamePokemonRouter')
const url = '/api/v1'

app.use(url, releasePokemonRouter)
app.use(url, catchPokemonRouter)
app.use(url, renamePokemonRouter)

module.exports = app