//File:         postItem.js
//Project:      Web - Frontend
//Programmer:   Addison Phillips
//Date:         Feb 22, 2024
//Description:  this contains the postItem component that makes up each post's required data

import {React } from 'react'

export default function PostItem({title, score, url, id, setFlag, viewMode}) {
  //add id to local storage
  const handleAddToFavorites = () => {
    localStorage.setItem(id,id);

  };

  //remove the id from local storage
  function handleRemoveFromFavorites (){
    localStorage.removeItem(id,id);
    setFlag(true);
    console.log("flag")

  };

  return (
    <div className='pt-1'>
      <div>
        <span className='text-wrap fw-bold'>{title}</span>
      </div>
      <div>
        <span>Score: {score}</span>
      </div>
      <div>
        <a href={url}>
          <span>{url}</span>
        </a>
      </div>
     
      <div>
      {viewMode === 'search' && (
        <button className='btn btn-success' onClick={handleAddToFavorites}>Add To Favourites</button>
        )}
         </div>
        <div>
         {viewMode === 'favorites' && (
        <button className='btn btn-danger'onClick={handleRemoveFromFavorites}>Remove</button>
         )}
         </div>
    </div>
  )
}
