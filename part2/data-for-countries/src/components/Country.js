import React, { useState } from 'react'

const Country = ( { country }) => {
    const [show, setShow] = useState(false)
    const getLanguages = () => (
        country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
    )

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
                    </div>
                : <p>{country.name}</p> 
            }
            <button onClick={handleClick}>show</button>
        </div>
    )
}

export default Country