import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ( { country }) => {
    const [show, setShow] = useState(false)
    const [weather, setWeather] = useState()
    const getLanguages = () => (
        country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
    )

    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
    console.log(api_key)
    console.log(url)
    useEffect(() => axios.get(url).then(res => setWeather(res.data)), [])
    

    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div>
            {
                show ? 
                    <div>
                        <h2>{country.name}</h2>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <h3>Languages:</h3>
                        <ul>
                            {getLanguages()}
                        </ul>
                        <img width='100px' height='100px' src={country.flag}/>
                        <h3>Weather in {country.capital}:</h3>
                        <p>temperature: {weather.current.temperature} Celcium</p>
                        <img width='70px' height='70px' src={weather.current.weather_icons[0]}/>
                        <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                    </div>
                : <p>{country.name}</p> 
            }
            <button onClick={handleClick}>show</button>
        </div>
    )
}

export default Country