import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


function App() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => axios.get('https://restcountries.eu/rest/v2/all').then(res => setData(res.data)), [])
  const handleChange = (event) => {
    if(event.target.value !== '') {
      setFilteredData(data.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
    } else setFilteredData([])
  }
  return (
    <div className="App">
      <input onChange={handleChange} />
      {filteredData.length < 10 ? <Countries data={filteredData}/> : <p>Too many matches!</p>}
    </div>
  );
}

export default App;
