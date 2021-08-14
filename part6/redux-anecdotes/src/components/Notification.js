
import React from 'react'

const Notification = ({ label }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {label}
    </div>
  )
}

export default Notification