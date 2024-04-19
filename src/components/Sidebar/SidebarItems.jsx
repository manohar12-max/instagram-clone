import React from 'react'
import SidebarHome from './SidebarHome'
import Notifications from './Notification'
import ProfileLink from './ProfileLink'
import CreatePost from './CreatePost'
import Search from './Search'
const SidebarItems = () => {
  return (
    <>
    <SidebarHome/>
   <Search/>
    <Notifications/>
    <CreatePost/>
    <ProfileLink/>
    
    </>
  )
}

export default SidebarItems
