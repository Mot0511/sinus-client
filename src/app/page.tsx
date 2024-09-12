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
            // @ts-ignore
            : posts?.map(post => <Post post={post} isDeleteAble={false} key={post.id} />)
        }
      </div>
    </div>
  )
}
export default News