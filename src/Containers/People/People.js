import React from 'react';
import'./People.css';

//assets
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'

//code use
import {useEffect, useState} from 'react';
import {getAll} from '../../services/starwars'


//components
import HeaderTop from '../../Components/HeaderTop/HeaderTop';
import Card from '../../Components/Card/Card';


function People() {

  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [home , setHome] = useState([]);
  const [nextUrl, setNextUrl] =useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const initialURL = 'https://swapi.dev/api/people/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAll(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.prevUrl);
      await loadingPeople(response.results)
      setLoading(false)

    }
    fetchData()
  }, [])

  const next = async () => {
    if(nextUrl){
      setLoading(true)
      let data = await getAll(nextUrl)
      await loadingPeople(data.results)
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
  await loadingPeople(data.results)
  setNextUrl(data.next)
  setPrevUrl(data.previous)
  setLoading(false)

}


  const loadingPeople = async (data) => {
    let _peopleData = await Promise.all(data.map(async char => char))
    let _planetRecord = await Promise.all(data.map(async char => {
      let planetData = await getAll(char.homeworld)
      return planetData;
    }))
    setPeople(_peopleData)
    setHome(_planetRecord)
    
    
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
            {people.map((char, i) => {
              return <Card key={i}
                h1="Character"
                info1={char.name}
                info2={char.birth_year}
                info3={`Gender: ${char.gender}`}
                info4={`Height: ${char.height}`}
                info5={`Mass: ${char.mass}`}
                info6={`Homeworld: ${home[i].name}`} />
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default People;
