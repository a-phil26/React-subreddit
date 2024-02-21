import React from 'react'
import PostItem from './postItem'

export default function PostList({list}) {
  return (
    <div>
        {list.map((item)=>(
            <PostItem 
            title={item.title}
            score={item.score}
            url={item.url}
            />
        ))
        }
    </div>
  )
}
