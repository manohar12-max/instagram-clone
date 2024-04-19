import React, { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Container,
  VStack,
  Text,
  Image,
  Button,
  Grid,
  GridItem,Skeleton
} from "@chakra-ui/react";
import ProfilePost from './ProfilePost'
import useGetUserPosts from '../../hooks/useGetUserPosts';
const ProfilePosts = () => {
  const {isLoading,posts}=useGetUserPosts()
  if(!isLoading && posts.length==0){
    return(<NoPostsFound/>)
  }
  return (
    <Grid 
    templateColumns={{sm:"repeat(1,1fr)",md:'repeat(3, 1fr)'}}
     gap={1}
     columnGap={1}>
    {isLoading &&(
      [1,2,3,4].map((ele,index)=>(
        <VStack key={index} alignItems={'flex-start'} gap={4}> 
          <Skeleton w={"full"}>
            <Box h="300px">
             content wrapped
            </Box>
          </Skeleton>
        </VStack>
      ))
    )}
    {
      !isLoading && (
        <>
        {posts.map((post)=>(
          <ProfilePost post={post} key={post.id} />
        ))}
        </>
      )
    }
  </Grid>
  )
}

export default ProfilePosts

const NoPostsFound = () => {
  return (
    <Flex
      align="center"
      justify="center"
      w="100%"
      h="100%"
      bg="gray.500"
      color="white"
    >
      <Text>No posts found</Text>
    </Flex>
  )
}