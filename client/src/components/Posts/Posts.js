import React from 'react'
import Post from './Post/Post'

const Posts = ( { posts }) => {
  console.log(posts);
  return (posts.length !== 0) && (
    posts.map( (post) => <Post post={post} key={post.id}/>)
  )
}

export default Posts