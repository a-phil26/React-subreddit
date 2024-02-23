//File:         favourites.js
//Project:      Web - Frontend
//Programmer:   Addison Phillips
//Date:         Feb 22, 2024
//Description:  this file contains the favourit component that gets all the IDs from local storage and then gets 
//              their data from the api. 

import PostList from './postList'
import  { React, useState, useEffect } from 'react';

export default function Favourites({accessToken, viewMode}) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favData, setFavData] = useState("");
  const [flag, setFlag] = useState(false);  

  useEffect(() =>{
    const getAllItemsFromLocalStorage = () => {
      setFlag(false);
      
      const allItems = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allItems.push(key);
        console.log(key);
      }
      setFavoriteList(allItems);
      
    };
    getAllItemsFromLocalStorage();
  }, [flag]
) 

useEffect(() => {
  const GetPosts = async () => {
    if (favoriteList.length === 0) {
      console.log("No data found");
      return;  // If favoriteList is empty, exit early
    }
    setSearchResults([])
    setFlag(false);
    let authorizeEndpoint = `https://oauth.reddit.com/by_id/`;
   
    for (let i = 0; i < favoriteList.length; i++) {
      let item =`t3_${favoriteList[i]},`
      authorizeEndpoint+=item;
    }

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
      setFavData("");
      setFavData(searchResults);
      console.log( searchResults);

    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };
  GetPosts();
},[favoriteList, flag])
 
 
  if (favoriteList.length === 0) {
    console.log("No data found");
  }

    return (
      <div>
      <h2>Favourites</h2>
      {favoriteList.length === 0 ? (
        <p>Add before seeing content</p>
      ) : (
        <div>
         {favData && <PostList 
         list={favData}
         setFlag={setFlag}
         viewMode={viewMode}
         />}
        </div>
      )}
    </div>
  )
}
