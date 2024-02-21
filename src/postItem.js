import React from 'react'

export default function PostItem({title, score, url}) {
  return (
    <div>
      <div>{title}</div>
      <div>{score}</div>
      <div>{url}</div>
    </div>
  )
}
