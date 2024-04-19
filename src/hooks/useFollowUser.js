import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import userProfileStore from "../store/userProfileStore";
import useShowToast from "../hooks/useShowToast";
import { arrayUnion, doc, updateDoc,arrayRemove } from "firebase/firestore";
import {firestore} from "../FireBase/firebase"
const useFollowUser = (userId) => {
console.log(userId)

  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);//instead write as below
  const setAuthUser =useAuthStore((state) => state.setUser)
  const {userProfile,setUserProfile} =userProfileStore()
  const  showToast=useShowToast()
  useEffect(() => {
    //  check if user is authenticated or not and if yes 
    //check its following or not (in array ) 
    //a user with user uid ie in userId
    if (authUser) {
        const CheckFollowing =authUser.following.includes(userId); 
        // we will get true or false from above
        setIsFollowing(CheckFollowing);
    }
    //dependency will be whenever authuser changes or userId changes
  }, [authUser, userId]);


  const handleFollowUser = async()=>{
    setIsUpdating(true)
   try{
     const currentUserRef=doc(firestore,"users",authUser.uid)
     const userToFollowOrUnfollowRef=doc(firestore,"users",userId)
     //after taking ref of both authuser and user to follow or unfoolow we will update boths documents 
      
     //if this user is alredy following then we will update by removing user from array of following
     await updateDoc(currentUserRef,{
        following:isFollowing ? arrayRemove(userId):arrayUnion(userId)
     })
     
      //if this user is alredy being followed then we will update by removing user from array of followers
     await updateDoc(userToFollowOrUnfollowRef,{
       followers:isFollowing ?arrayRemove(authUser.uid):arrayUnion(authUser.uid)
     })
     // hence we updatedt or data bases
     
     //now will update user interfaces by updating the userProfile and authsuer
     if(isFollowing) {
        //unfollow
        setAuthUser({
            ...authUser,
            following:authUser.following.filter(uid=> uid !==userId )
        })
        //update userProfile only if therenis userprofile else no need
        if(userProfile){
        setUserProfile({
            ...userProfile,
             followers:userProfile.followers.filter(uid=> uid !==authUser.uid )
           })
        }
           localStorage.setItem('user-info', JSON.stringify({
            ...authUser,
            following:authUser.following.filter(uid=> uid !==userId )
        }));
        setIsFollowing(false);
     }else{
        setAuthUser({
            ...authUser,
            following:[...authUser.following,userId]
        })
        if(userProfile){
        setUserProfile({
            ...userProfile,
             followers:[...userProfile.followers,authUser.uid]
           })
          }
           localStorage.setItem('user-info', JSON.stringify({
            ...authUser,
            following:[...authUser.following,userId]
            
        }));
        setIsFollowing(true);
     }
     
   }catch(error){
    showToast('Error',error.message,"error");
   }finally{
    setIsUpdating(false)
   }
  }
  return {isUpdating,isFollowing,handleFollowUser};
};

export default useFollowUser;
