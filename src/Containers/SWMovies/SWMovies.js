import React from 'react';
import './SWMovies.css'

//code use
import { useEffect, useState } from 'react'
import { getAll } from '../../services/starwars'


//components
import HeaderTop from '../../Components/HeaderTop/HeaderTop';
import Card from '../../Components/Card/Card';


function SWMovies() {
  const [loading, setLoading] = useState(true);
  const [swMovies, setSwMovies] = useState([]);
  const initialURL = 'https://swapi.dev/api/films/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAll(initialURL)
      console.log(response);
      await loadingMovies(response.results)
      setLoading(false)

    }
    fetchData()
  }, [])

  const loadingMovies = async (data) => {
    let _moviesData = await Promise.all(data.map(async movie => movie))
    setSwMovies(_moviesData)
    console.log(_moviesData)
  }


  return (
    <div className="App">
      <HeaderTop />
      {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
        <>
          <div className="grid-container">
            {swMovies.map((movie, i) => {
              return <Card key={i}
                h1="Star Wars"
                info1={movie.title}
                info2={movie.opening_crawl}
                info3={`Director: ${movie.director}`}
                info4={`Producer: ${movie.producer}`}
                info5={`Year: ${movie.release_date}`} />
            })}
          </div>
        </>
      )}

    </div>
  );
}

export default SWMovies;
