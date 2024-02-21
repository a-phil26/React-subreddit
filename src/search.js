import React, { useState } from 'react'

export default function Search({accessToken, setList}) {
  const [searchReddit, setSearchReddit] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const GetSubReddit = async () => {
    let authorizeEndpoint = `https://oauth.reddit.com/r/${searchReddit}/hot?limit=10`;

    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          
          'Authorization': `bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      
      const response = await fetch(authorizeEndpoint, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to obtain more data');
      }

      const responseData = await response.json();
      console.log(responseData.data.children[1].data)
      
      responseData.data.children.forEach(child => {
        let data = {
          'title': child.data.title,
          'score': child.data.score,
          'url': "https://www.reddit.com"+child.data.permalink
        }

        searchResults.push(data)
        
      });
      
      setList(searchResults);
      //console.log(responseData.data.children[0].id);
    //   responseData.data.children[0].data.title
    //   responseData.data.children[0].data.score
    //   responseData.data.children[0].data.url
    
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };




  const handleFormSubmit = (e) =>{
    e.preventDefault();
    GetSubReddit();
  }
    return (
    <form onSubmit={handleFormSubmit}>
        <div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Sub-reddit:</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={(e)=>setSearchReddit(e.target.value)}/>
            <button type="submit" className='btn btn-primary'>Search</button>
          </div>
        </div>
    </form>
   
  )
}
