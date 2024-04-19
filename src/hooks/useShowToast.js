import { useToast } from '@chakra-ui/react'
import React, { useCallback } from 'react'
//useToast is the hook of chakra since we don't want to use object toast{...} again and again we will custom hook
//useCallback hook is used to prevent infinite loop, by catching the fuction
const useShowToast = () => {
    const toast =useToast();
    const showToast=useCallback((title,description,status)=>{
      toast({
     title:title,
     description:description,
     status:status,
     duration:3000,
     isClosable:true,
      })
   },[toast])
  return showToast
}

export default useShowToast
