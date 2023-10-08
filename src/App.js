import React, { useEffect, useState } from 'react'
import './App.css'
import { getAutocomplete, getCards, postCard } from './service'

function App() {
  const [cards, setCards] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const fetchAutocomplete = async (q) => {
    const { data } = await getAutocomplete(q.target.value)
    setSearchResults(data)
  }

  const fetchCards = async () => {
    const { cards } = await getCards()
    setCards(cards)
  }

  const addCard = async (name) => {
    await postCard(name.target.value)
    fetchCards()
  }

  useEffect(() => {
    fetchCards()
  }, [cards, searchResults])

  return (
    <div>
      <div className="search-bar-container">
        <input
          className="search-bar"
          id="search"
          type="text"
          name="q"
          onChange={fetchAutocomplete}
        ></input>
        {searchResults && (
          <div className="search-results">
            <ul>
              {searchResults.map((card) => (
                <li key={card}>
                  {card} <button onClick={addCard}>Add</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {cards && (
        <div className="cards-container">
          {cards.map((card) => (
            <li key={card.mtgo_id}>{card}</li>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
