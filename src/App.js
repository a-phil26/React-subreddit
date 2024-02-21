
import { useState, useEffect } from 'react';
import './App.css';



function App() {

  const secert = process.env.REACT_APP_REDDIT_APP_API_KEY;
  const client_id = process.env.REACT_APP_REDDIT_APP_API_ID;
  const basicAuth = btoa(`${client_id}:${secert}`);
  const endpoint = 'https://www.reddit.com/api/v1/access_token';
  const username = process.env.REACT_APP_REDDIT_APP_API_USERNAME;
  const password = process.env.REACT_APP_REDDIT_APP_API_PASSWORD;


  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState('');

 

  const GetMoreData = async () => {
    const authorizeEndpoint = `https://oauth.reddit.com/api/v1/me`;

    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          
          'Authorization': `bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      console.log(requestOptions);
      const response = await fetch(authorizeEndpoint, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to obtain more data');
      }

      const responseData = await response.json();

    
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

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

  const handleOnClick = () => {
    GetMoreData();
  };

  return (
    <div>
      <header></header>
      <button onClick={handleOnClick}>Click Me!</button>
      <label name="test1"></label>
    </div>
  );
}

export default App;
