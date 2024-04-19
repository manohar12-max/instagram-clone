import React from 'react'
import {Flex ,Box ,Container }  from '@chakra-ui/react'
import FeedPosts from '../../components/FeedPost/FeedPosts'
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser'
const HomePage = () => {

  return (
    <Container maxW={"container.lg"}>
     <Flex gap={20}>
      <Box flex={2} py={10}>
        {/* feed post */}
        <FeedPosts/>
      </Box>
      <Box flex={2} py={2} mr={20} display={{base:"none",lg:"block"}}
      maxW={"300px"} >
        {/* suggested users */}
        <SuggestedUsers/>
      </Box>
     </Flex>
    </Container>
  )
}

export default HomePage
