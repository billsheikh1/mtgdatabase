const express = require('express')
const { cards } = require('./data.json')
const cors = require('cors')
const app = express()
const port = 1000

const api = 'https://api.scryfall.com/cards/'
const nameApi = `${api}named?exact=`

const getCard = async (str) => {
  return await fetch(`${nameApi}${str}`).then((res) => res.json())
}

app.use(cors)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cards', (req, res) => {
  console.log('card', cards)
  res.json(cards)
})

app.get('addCard', async (req, res) => {
  const name = req.query.name
  const card = await getCard(name)
  cards.push(card)
  console.log('cards', cards)
  res.status(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
