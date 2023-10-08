const express = require('express')
// const { cards } = require('./data.json')
require('dotenv').config({ path: './config.env' })
const { getCards, addCard } = require('./routes')
const cors = require('cors')
const client = require('./db')
const app = express()
const port = 1000

// const api = 'https://api.scryfall.com/cards/'
// const nameApi = `${api}named?exact=`

// const getCard = async (str) => {
//   return await fetch(`${nameApi}${str}`).then((res) => res.json())
// }

app.use(cors)
// app.use(express.json())

app.get('/cards', getCards)
app.post('/addCard', addCard)

// app.get('/cards', (req, res) => {
//   console.log('card', cards)
//   res.json(cards)
// })

// app.get('/addCard', async (req, res) => {
//   const name = req.query.name
//   const card = await getCard(name)
//   cards.push(card)
//   console.log('cards', cards)
//   res.status(200)
// })

app.listen(port, () => {
  client.connect((err, db) => {
    console.log('e', err)
    console.log('d', db)
    if (err) console.error(err)
    if (db) console.log('DB connected')
  })
  console.log(`Server is running on port: ${port}`)
})
