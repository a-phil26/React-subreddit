
import { useState, useEffect, Suspense  } from 'react';
import './App.css';
import PostList from './postList'
import Favourites from './favourites'

import Search from './search'


function App() {

  const secret = process.env.REACT_APP_REDDIT_APP_API_KEY;
  const client_id = process.env.REACT_APP_REDDIT_APP_API_ID;
  const basicAuth = btoa(`${client_id}:${secret}`);
  const endpoint = 'https://www.reddit.com/api/v1/access_token';
  const username = process.env.REACT_APP_REDDIT_APP_API_USERNAME;
  const password = process.env.REACT_APP_REDDIT_APP_API_PASSWORD;

  const [searchData, setSearchData] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState([]);

  const [viewMode, setViewMode] = useState('search')
 
  useEffect(() => {
    const fetchData = async () => {
      localStorage.clear();
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            'grant_type': 'password',
            'username': username,
            'password': password,
          }),
        };
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
          throw new Error('Failed to obtain access token');
        }
        const responseData = await response.json();
        const newAccessToken = responseData.access_token;
        setAccessToken(newAccessToken); // Set the access token in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [basicAuth, endpoint, username, password]);

  useEffect(() => {
  const GetSubReddit = async () => {
    let authorizeEndpoint = `https://oauth.reddit.com/r/${searchString}/hot?limit=10`;
    setSearchResults([]);
   
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
      
      responseData.data.children.forEach(child => {
        let data = {
          'title': child.data.title,
          'score': child.data.score,
          'url': "https://www.reddit.com"+child.data.permalink,
          'id' : child.data.id
        };

        searchResults.push(data)
        
      });
      setSearchData(searchResults);
      
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };
  GetSubReddit();
},[searchString])

const handleFavourites = () => {
  // Toggle between 'search' and 'favorites' view
  setViewMode((prevMode) => (prevMode === 'search' ? 'favorites' : 'search'));
};
return (
  <div className='bg-light '>
    <div id="main" className=" d-flex align-items-center">
      <div className='container'>
        <div className='row'>
          <div style={{ width: '15%' }} className='col'>
            {/* Content for the left side, if needed */}
          </div>
          <div style={{ width: '70%', backgroundColor: '#c2c2c2' }} className='col'>
            <header className='fs-2'>Sub-Reddit App</header>
            <button onClick={handleFavourites}>
              {viewMode === 'search' ? 'Favorites' : 'Search Results'}
            </button>
            <div id='search-bar'>
              <Search accessToken={accessToken} setString={setSearchString} />
            </div>
            <div id='list-space'>
              <Suspense fallback={<div>Loading...</div>}>
                {viewMode === 'search' && searchData && (
                  <PostList list={searchData} viewMode={viewMode} />
                )}
                {viewMode === 'favorites' && (
                  <Favourites accessToken={accessToken} viewMode={viewMode} />
                )}
              </Suspense>
            </div>
          </div>
          <div style={{ width: '15%' }} className='col'>
            {/* Content for the right side, if needed */}
          </div>
        </div>
      </div>
    </div>
  </div>
);




}

export default App;
