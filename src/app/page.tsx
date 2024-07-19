import React from 'react'
import Post from '@/components/post/post'
import cl from './page.module.sass'

const News = () => {
  return (
    <div>
      <h2 className={'heading'}>Новости</h2>
      <div className={'flex'}>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
export default News