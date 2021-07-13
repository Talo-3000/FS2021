import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries] = useState([])
  const [ weather, setWeather ] = useState()

  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <Countries countries={countries} filter={filter} setFilter={setFilter} apikey={api_key} weather={weather} setWeather={setWeather}/>
    </div>
  )
}
const Countries = ({countries, filter, setFilter, apikey, weather, setWeather}) => {
  
  const toShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (toShow.length > 10){
    return ("Too many matches, specify another filter")
  }
  if (toShow.length === 1) {
    const country = toShow[0]
    return (
      <CountryDetails country={country} apikey={apikey} weather={weather} setWeather={setWeather}/>
    )
  }
  return (
    <div>
      <ul>
        {toShow.map(country => <li>{country.name} <Button country={country} setFilter={setFilter}/></li>)}
      </ul>
    </div>
  )
}

const Weather = ({ place, apikey, weather, setWeather }) => {
  useEffect(() => {
    setWeather('')
    axios.get('http://api.weatherstack.com/current?access_key='+apikey+'&query='+place)
    .then(response => {
      console.log("sää saatu")
      setWeather(response.data.current)
    })
  }, [place, setWeather, apikey])
  console.log(weather)

  if (weather) {
    return (
      <div>
        <h2>Weather in {place}</h2> 
        <p>Temperature: {weather.temperature} Celsius </p>
        <img src={weather.weather_icons[0]} alt="kuva" />
        <p>Wind: {weather.wind_speed} mph direction {weather.win_dir}</p>
      </div>
    )
  }
  else {
    return(
      <div>Loading weather..</div>
    )
  }
}
const CountryDetails = ({country, apikey, weather, setWeather}) => {

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width="100px"/>
      <Weather apikey={apikey} place={country.capital} weather={weather} setWeather={setWeather}/>
    </div>
  )
}
const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      find countries <input 
      value={filter}
      onChange={handleFilter}/>      
    </div>
  )
}
const Button = ({country, setFilter}) => (
  <button type="button" onClick={() =>
    setFilter(country.name) }>
    show
  </button>
)

  

export default App;
