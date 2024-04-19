import React from 'react'
import{Flex,Box,VStack,Text,Link} from"@chakra-ui/react"
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUser'
const SuggestedUsers = () => {
  const  { isLoading, suggestedUsers }=useGetSuggestedUsers()
  if(isLoading) return null
  return (
    <VStack py={8}  px={6} gap={4}>
     <SuggestedHeader/>
     {suggestedUsers.length &&( <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
      <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
        Suggested for you
      </Text>
      <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"}>
        See All
      </Text>
     </Flex>)}
    
     {suggestedUsers.map((user) =>(
       <SuggestedUser key={user.id} user={user} />
     ))}
     <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
				© 2023 Built By{" "}
				<Link href='#' color='blue.500' fontSize={14}>
					As a Programmer
				</Link>
			</Box>
    </VStack>
  )
}

export default SuggestedUsers
