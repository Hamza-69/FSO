import { useEffect, useState } from 'react'
import info from "./services/info.js"
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const Filter = ({filter, onChange, text}) => {
  return (
    <>
    {text} <input type='text' value={filter} onChange={onChange}/>
    </>
  )
}
const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <div>Temperature: {weatherData.current.temp_c} °C</div>
      <img src={weatherData.current.condition.icon} alt="Weather icon" />
      <div>Wind: {weatherData.current.wind_kph} k/h</div>
    </div>
  );
};
const parseOne = (country) => {
  return (
    <>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <br/>
    <h2>languages</h2>
    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    <br />
    <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    <br />
    <h2>Weather</h2>
    <Weather city={country.capital} />
    </>
  )
}
const App = () => {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])
  const [shown, setShown] = useState()
  useEffect(() =>{
    info.getAll().then(response => {
      setData(response)
    })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const searchTerm = event.target.value.toLowerCase()
    const filteredCountries = data.filter(country => {
      const commonName = country.name.common.toLowerCase()
      const officialName = country.name.official.toLowerCase()
      return commonName.includes(searchTerm) || officialName.includes(searchTerm)
    })
    if (filteredCountries.length === 1) {
      setShown(parseOne(filteredCountries[0]))
    } else if (filteredCountries.length > 10) {
      setShown("Too many matches, specify another filter")
    } else {
      setShown(filteredCountries.map(country => <li key={country.name.common}>{country.name.common}<Button text='show' onClick={() => setShown(parseOne(country))} /></li>))
    }
  }
  return (
    <>
    <Filter
      filter={filter}
      onChange={handleFilterChange}
      text='find countries'
    />
    <br/>
    {shown}
    </>
  )
}


export default App
 