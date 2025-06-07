import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import newstore from '@/redux/newstore'

const Posts = () => {
  const {posts} = useSelector(newstore=>newstore.post1);
  return (
    <div>
        {
            posts.map((post1) => <Post key={post1._id} post1={post1}/>)

        }
    </div>
  )
}

export default Posts