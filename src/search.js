import React, { useState } from 'react'

export default function Search({setString}) {
  const [searchReddit, setSearchReddit] = useState("");


  const handleFormSubmit = (e) =>{
    e.preventDefault();
    setString(searchReddit);
  }
    return (
    <form onSubmit={handleFormSubmit}>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Sub-reddit: r/</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setSearchReddit(e.target.value)}/>
            <button type="submit" className='btn btn-primary'>Search</button>
          </div>
        </div>
    </form>
   
  )
}
