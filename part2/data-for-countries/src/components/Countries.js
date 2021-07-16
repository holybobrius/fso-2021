import React from 'react'
import Country from './Country'

const Countries = ({ data }) => {
    return (
        <div>
            {data.length !== 1 ? data.map(country => <p key={country.name}>{country.name}</p>) : <Country country={data[0]}/>}
        </div>
    )
}

export default Countries