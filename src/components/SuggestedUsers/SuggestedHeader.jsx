import React from 'react'
import{Flex,Box,VStack,Text,Avatar,Button} from"@chakra-ui/react"
import {Link } from "react-router-dom"
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'
 
const SuggestedHeader = () => {
  const {handleLogout,isLoggingOut}=useLogout()
  
  const authuser=useAuthStore(state=>state.user)
  if(!authuser) return null
  return (
    <Flex justifyContent={'space-between'} alignItems={"center"} w={"full"}>
    <Flex alignItems={"center"} gap={2}>
      <Link to={authuser.username}>
				<Avatar  size={"lg"} src={authuser.profilePicURL} /></Link>
        <Link to={authuser.username}>
				<Text fontSize={12} fontWeight={"bold"}>
        {authuser.username}
				</Text>
        </Link>
			</Flex>
      <Link
				to={"/auth"}>
      <Button
      size={"xs"}
      bg={"transparent"}
      fontSize={14}
				fontWeight={"medium"}
				color={"blue.400"}
				cursor={"pointer"}
        style={{textDecoration:"none"}}
        onClick={handleLogout}
        isLoading={isLoggingOut}
      >
      Logout
      </Button>
      </Link>
    </Flex>
  )
}

export default SuggestedHeader
