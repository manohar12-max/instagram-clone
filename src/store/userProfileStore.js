import React from 'react'
import { create } from 'zustand'
const useUserProfileStore =create((set)=>({
   userProfile:null,
   setUserProfile:(userProfile)=> set({userProfile:userProfile}),
   // we need update the no. of post in profile page
   addPost:(post)=> 
   set((state)=>({
      userProfile:{
         ...state.userProfile,
          posts:[post.id,...state.userProfile.posts] //we will store ids here
      }
   })),
   //delete post
   deletePost:(postId)=> 
   set((state)=>({
      userProfile:{
         ...state.userProfile,
         posts:state.userProfile.posts.filter(id => id !== postId)
      }
    }))
}))

export default useUserProfileStore
