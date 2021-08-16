import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = props => {

  const handleChange = event => {
    props.setFilter(event.target.value)
  }

  return (
    <div>
      filter <input onChange={handleChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}
const mapStateToProps = (state) => {
  return {}
}

const FilterConnected = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default FilterConnected

