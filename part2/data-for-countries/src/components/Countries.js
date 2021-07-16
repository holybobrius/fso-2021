import React from 'react'
import Country from './Country'

const Countries = ({ data }) => {
    return (
        <div>
            {data.length !== 1 ? data.map(country => <Country key={country.name} country={country}/>) : <Country country={data[0]}/>}
        </div>
    )
}

export default Countries