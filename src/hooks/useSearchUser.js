import React, { useState } from 'react'
import useShowToast from './useShowToast';
import { firestore } from '../FireBase/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
const useSearchUser = () => {
    const [isloading,setIsloading] =useState(false);
    const [user,setUser]=useState(null)
    const showToast=useShowToast();
    const getUserProfile = async (username) => {
         setIsloading(true);
         setUser(null);
     try {
      const q=query (collection(firestore,"users"),where("username","==",username))
      const querySnapshot=await getDocs(q)
      if(querySnapshot.empty){
        return showToast("Error","User don't exists","error")
       
      }
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
      })
     }catch(error){
    showToast("Error",error.message,"error")
    setUser(null);
     }
     finally{
    setIsloading(false)
     }
    }
  return {isloading,user,getUserProfile,setUser}
}

export default useSearchUser
