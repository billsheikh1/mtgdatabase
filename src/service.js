require('dotenv').config()
const scryfallApi = 'https://api.scryfall.com/cards/'
const localApi = process.env.REACT_APP_API_URI || 'http://localhost:1000'
const autocomplete = `${scryfallApi}autocomplete?q=`

export const getAutocomplete = (str) => {
  return fetch(`${autocomplete}${str}`).then((res) => res.json())
}

export const postCard = (card) => {
  return fetch(`${localApi}/addCard?name=${card}`)
}

export const getCards = () => {
  return fetch(`${localApi}/cards`).then((res) => res.json())
}
