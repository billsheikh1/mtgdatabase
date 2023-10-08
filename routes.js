const { client } = require('./db')
const getCards = (req, res) => {
  client.connect((err) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    const collection = client.db('mtgdatabase').collection('mtg')
    collection.find().toArray((err, result) => {
      if (err) res.status(500).send(err)
      if (result) res.json(result)
      client.close()
    })
  })
}

const addCard = (req, res) => {
  client.connect((err) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    const card = {
      name: req.body.name,
      price: req.body.price,
    }
    const collection = client.db('mtgdatabase').collection('mtg')
    collection.insertOne(card, (err, result) => {
      if (err) res.status(500).send(err)
      if (result) res.json(result)
      client.close()
    })
  })
}

module.exports = {
  getCards,
  addCard,
}

// const express = require('express')
// const routes = express.Router()
// const dbo = require('./db')
// const ObjectId = require('mongodb').ObjectId

// routes.route('/cards').get((req, res) => {
//   const conn = dbo.getDb('mtgdatabase')
//   conn.collection('mtg').find({})
//   toArray((err, result) => {
//     if (err) throw err
//     res.json(result)
//   })
// })

// routes.route('/addCard').post((req, res) => {
//   const conn = dbo.getDb()
//   const card = {
//     name: req.body.name,
//     price: req.body.price,
//   }
//   conn.collection('mtg').insertOne(card, (err, result) => {
//     if (err) throw err
//     res.json(result)
//   })
// })
