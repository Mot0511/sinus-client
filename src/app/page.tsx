"use client"

import React, { useEffect, useState } from 'react'
import Post from '@/components/post/post'
import cl from './page.module.sass'
import PostSchema from '../types/post'
import getAllPosts from '@/services/posts/getAllPosts'
import Loading from '@/components/loading/loading'

const News = () => {

  const [posts, setPosts] = useState<PostSchema[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getAllPosts()
      .then(posts => {
        setPosts(posts)
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      <h2 className={'heading'}>Новости</h2>
      <div className={'flex'}>
        {
          isLoading
            ? <Loading />
            : posts?.map(post => <Post id={post.id} text={post.text} key={post.id} />)
        }
      </div>
    </div>
  )
}
export default News