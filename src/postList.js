//File:         postList.js
//Project:      Web - Frontend
//Programmer:   Addison Phillips
//Date:         Feb 22, 2024
//Description:  this file contains the mapping function to make a list of components.

import React from 'react'
import PostItem from './postItem'


export default function PostList({list, setFlag, viewMode}) {

  return (
    <div>
        {list.map((item)=>(
            <PostItem 
            title={item.title}
            score={item.score}
            url={item.url}
            id = {item.id}
            list={list}
            setFlag = {setFlag}
            viewMode={viewMode}
            />
        ))
        }
    </div>
  )
}
