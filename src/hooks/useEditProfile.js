import React from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { storage,firestore} from '../FireBase/firebase'
import { uploadString,ref, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from '../store/userProfileStore'
import { useState } from 'react'
const useEditProfile = () => {
   const [isUpdating,setIsUpdating] = useState(false)
   const authUser=useAuthStore(state=>state.user)
   const setAuthUser=useAuthStore(state=>state.setUser)
   const setUserProfile = useUserProfileStore(state=>state.setUserProfile)
   const showToast=useShowToast()
  
   const editProfile=async(input,selectedFile)=>{
    if(isUpdating || !authUser){
        return
    }
    setIsUpdating(true)
    //for uploading storage
    const storageRef=ref(storage, `profilePics/${authUser.uid}`)
    
    let URL=""
    try {
        if(selectedFile){
         await uploadString(storageRef,selectedFile,"data_url")
         URL=await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
        }

    //for updating data at firestore
        const updatedUser={...authUser,
            fullName:input.fullName||authUser.fullName,
            username:input.username||authUser.username,
            bio:input.bio||authUser.bio,
            profilePicURL:URL||authUser.profilePicURL,
        }
    const userDocRef= doc(firestore,"users",authUser.uid)
        await updateDoc(userDocRef,updatedUser)
        localStorage.setItem("user-info",JSON.stringify(updatedUser))
        setAuthUser(updatedUser)
         setUserProfile(updatedUser)
    
        showToast("Success","Your profile has been updated","success")
    }catch(error){
        showToast("Error",error.message,"error")
    }finally{
        setIsUpdating(false);
    }
   }
return {editProfile,isUpdating}
}

export default useEditProfile
