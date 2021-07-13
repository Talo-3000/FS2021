import React from 'react'

const Filter = ({ filter, handleFilter }) => {
  
    return (
      <div>
        filters shown with <input 
        value={filter}
        onChange={handleFilter}/>
      </div>
    )
  }
  
export default Filter