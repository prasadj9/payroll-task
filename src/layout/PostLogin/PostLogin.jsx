import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import LeftSidebar from './LeftSidebar'

const PostLogin = () => {
  return (
    <div>PostLogin
      <TopBar/>

      <LeftSidebar/>
      <Outlet/>
    </div>
  )
}

export default PostLogin