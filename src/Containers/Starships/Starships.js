import React from 'react';
import'./Starships.css';

//assets
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'


//code use
import {useEffect, useState} from 'react';
import {getAll} from '../../services/starwars'


//components
import HeaderTop from '../../Components/HeaderTop/HeaderTop';
import Card from '../../Components/Card/Card';


function Starships() {

  const [loading, setLoading] = useState(true);
  const [starships, setStarships] = useState([]);
  const [nextUrl, setNextUrl] =useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const initialURL = 'https://swapi.dev/api/starships/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAll(initialURL)
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.prevUrl);
      await loadingStarships(response.results)
      setLoading(false)

    }
    fetchData()
  }, [])

  const next = async () => {
    if(nextUrl){
      setLoading(true)
      let data = await getAll(nextUrl)
      await loadingStarships(data.results)
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
  await loadingStarships(data.results)
  setNextUrl(data.next)
  setPrevUrl(data.previous)
  setLoading(false)

}


  const loadingStarships = async (data) => {
    let _starshipsData = await Promise.all(data.map(async starship => starship))
    setStarships(_starshipsData)
    console.log(_starshipsData)
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
            {starships.map((starship, i) => {
              return <Card key={i}
                h1="Starships"
                info1={starship.name}
                info2={starship.starship_class}
                info3={`Manufacturer: ${starship.manufacturer}`}
                info4={`Price: ${starship.cost_in_credits}`}
                info5={`Crew: ${starship.crew}`} />
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Starships;
