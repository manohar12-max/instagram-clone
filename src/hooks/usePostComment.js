import React, { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../FireBase/firebase'
import usePostStore from '../store/postStore'

const usePostComment = () => {
 const [isCommenting,setIsCommenting] =useState(false)
 const showToast=useShowToast()
 const authUser=useAuthStore((state)=> state.user)
 const addComment=usePostStore(state=> state.addComment)
 
 const handlePostComment=async(postId,comment)=>{
    if(isCommenting)return 
    if(comment=="")return
    if(!authUser)return showToast("Error" ,"You must Log in to Comment","error")
    setIsCommenting(true)
    const newComment ={
        comment:comment,
        createdAt:Date.now(),
        createdBy:authUser.uid,
        postId:postId
    }
 try{
//  create a new comment
//we want to update post doc 
   await updateDoc(doc(firestore,"posts",postId),{
    comments:arrayUnion(newComment)
   })
   addComment(postId,newComment)
 }catch(error){
    showToast("Error",error.message,"error")
 }finally{
    setIsCommenting(false)
 }  
 }
return {isCommenting,handlePostComment}
}

export default usePostComment
