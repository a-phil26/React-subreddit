import React from 'react'
import PostItem from './postItem'
import { useState} from 'react'

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
