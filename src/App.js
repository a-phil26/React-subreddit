
import { useState, useEffect, Suspense  } from 'react';
import './App.css';
import PostList from './postList'

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
 
  useEffect(() => {
    const fetchData = async () => {
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


  return (
    <div>
      <header>

      </header>
      <div id="main">
        <div id='search-bar'>
          <Search 
            accessToken={accessToken}
            setList = {setSearchData}
          />
        </div>
        <div id='list-space'>
        <Suspense fallback={<div>Loading...</div>}>
        {searchData && <PostList 
            list ={searchData}
          /> }
          </Suspense>
        </div>
        
      </div>
  
    </div>
  );
}

export default App;
