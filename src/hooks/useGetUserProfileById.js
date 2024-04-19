
import { useState,useEffect } from 'react'
import useShowToast from './useShowToast'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../FireBase/firebase'
const useGetUserProfileById = (userId) => {
  const [isLoading,setIsLoding]=useState(true)
  const [userProfile,setUserProfile]=useState(null)
  const showToast=useShowToast()
  useEffect(()=>{
    const getUserProfile = async () => {
        setIsLoding(true)
        setUserProfile(null)
     try{
      const userRef = await getDoc(doc(firestore, "users", userId));
      console.log(userRef.data())
      if (userRef.exists()) {
        setUserProfile(userRef.data());
      }
     }catch(error){
       showToast("Error", error.message, "error")
     }finally{
        setIsLoding(false)
     }
    }
    getUserProfile()
},[userId,showToast])
  return {isLoading,userProfile,setUserProfile}
}

export default useGetUserProfileById
