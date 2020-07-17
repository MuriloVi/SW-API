import React from 'react';
import './Planets.css';

//assets
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

//code use
import { useEffect, useState} from 'react';
import {getAll} from '../../services/starwars'

//components
import HeaderTop from '../../Components/HeaderTop/HeaderTop';
import Card from '../../Components/Card/Card';


function Planets() {
  const [loading, setLoading] = useState(true);
  const [Planets, setPlanets] = useState([]);
  const [nextUrl, setNextUrl] =useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const initialURL = 'https://swapi.dev/api/planets/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAll(initialURL)
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.prevUrl);
      await loadingPlanets(response.results)
      setLoading(false)

    }
    fetchData()
  }, [])

  const next = async () => {
    if(nextUrl){
      setLoading(true)
      let data = await getAll(nextUrl)
      await loadingPlanets(data.results)
      setNextUrl(data.next)
      setPrevUrl(data.previous)
      setLoading(false)
    } else{
      return
    }
 

 }

 const prev = async () => {
  if (!prevUrl) return;
  setLoading(true)
  let data = await getAll(prevUrl)
  await loadingPlanets(data.results)
  setNextUrl(data.next)
  setPrevUrl(data.previous)
  setLoading(false)

}


  const loadingPlanets = async (data) => {
    let _planetsData = await Promise.all(data.map(async planet => planet))
    setPlanets(_planetsData)
    console.log(_planetsData)
  }

  return (
    <div className="App">
      <HeaderTop/>
      {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
        <>
        <div className="btn">
       <button onClick={prev}><AiOutlineArrowLeft/></button>
      <button onClick={next}><AiOutlineArrowRight/></button>
        </div>
          <div className="grid-container">
            {Planets.map((planet, i) => {
              return <Card key={i}
                h1="Planet"
                info1={planet.name}
                info2={planet.terrain}
                info3={`Climate: ${planet.climate}`}
                info4={`Population: ${planet.population}`}
                info5={`Gravity: ${planet.gravity}`} />
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
