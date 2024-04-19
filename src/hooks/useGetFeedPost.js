import React from 'react'
import { useState,useEffect } from 'react'
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import useUserProfileStore from "../store/userProfileStore"
import { query } from 'firebase/database'
import { collection, getDocs, where } from 'firebase/firestore'
import {firestore} from '../FireBase/firebase'
const useGetFeedPost = () => {
    const [isLoading,setIsLoading] =useState(true);
    const {posts,setPosts}=usePostStore() 
    const authUser=useAuthStore(state=>state.user)
    const {setUserProfile}=useUserProfileStore()
    const showToast= useShowToast()

    useEffect(()=>{
        const getFeedPosts=async()=>{
        setIsLoading(true)
        if(authUser.following.length==0) {
            //if user is not following anyone then show nonthing in feed
            setIsLoading(false);
            setPosts([]);
            return
        }
        const q=query(collection(firestore,"posts"),where("createdBy","in",authUser.following))
        try{ //it will give the post of the users which we follow by filtering posts with authuser.following will have created by ids
           const querySnapshot=await getDocs(q)
           const feedPosts=[]
           querySnapshot.forEach((doc)=>{
            feedPosts.push({id:doc.id,...doc.data()})
           })
           feedPosts.sort((a,b)=>b.createdAt-a.createdAt);
           setPosts(feedPosts)

        }catch(error){
          showToast("Error",error.message,"Error");
        }finally{
            setIsLoading(false)
        }
    }
    if(authUser) getFeedPosts()
    },[authUser,showToast,setPosts,setUserProfile])
  return {isLoading,posts}
}

export default useGetFeedPost
