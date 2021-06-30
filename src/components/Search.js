import React, { useState } from 'react'
import { OMDD_API_KEY } from '../config.js';

export default function Search() {
  const [title, setTitle] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchCmplete, setSearchComplete] = useState(false)
  const [found, setFound] = useState(false)
  const [movies, setMoviews] = useState([])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies()
    }
  }

  const searchMovies = () => {
    setSearching(true)
    setFound(false)
    const url = `http://www.omdbapi.com/?s=${title}&apikey=${OMDD_API_KEY}`
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        setSearching(false)
        setSearchComplete(true)
        if (json.Response === "True") {
          setMoviews(json.Search)
          setFound(true)
        }
      })
  }

  return (
    <div>
      <h1>Search movies</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} onKeyDown={handleKeyDown} />
      <button onClick={searchMovies} >Search</button>
      {searching ?
        <p>searching...</p>
        : searchCmplete ?
          found ?
            movies.map(movie =>
              <div key={movie.imdbID}>
                <h2>{movie.Title} ({movie.Year})</h2>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            )
            : <p>No movies with this title found.</p>
          : null
      }
    </div>
  )
}
