import React from 'react'

const Country = ( { country }) => {
    const getLanguages = () => (
        country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
    )
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
                {getLanguages()}
            </ul>
            <img width='100px' height='100px' src={country.flag}/>
        </div>
    )
}

export default Country