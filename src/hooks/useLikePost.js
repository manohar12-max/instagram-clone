import React, { useState } from 'react'
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';

const useLikePost = (post) => {
    const [isUpdating,setIsUpdating] =useState(false);
    const authUser=useAuthStore((state)=>state.user);
    const [likes,setLikes]=useState(post.likes.length)
    const [isLiked,setIsLiked]=useState(post.likes.includes(authUser?.uid))
    const showTost=useShowToast()
    

    const handleLikePost=async()=>{
        if(isUpdating)return;
        if(!authUser)return showTost("Error","You must be logged in","error");
        setIsUpdating(true);
        try{
           const postRef=  doc(firestore,"posts",post.id);
           await updateDoc(postRef,{
            likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
           })
          setIsLiked(!isLiked);
          isLiked ? setLikes(likes-1) : setLikes(likes+1);
        }catch(error){
          showTost("Error",error.message,"error");
        }finally{
            setIsUpdating(false)
        }
    }
  return {isUpdating,isLiked,likes,handleLikePost}
}

export default useLikePost
