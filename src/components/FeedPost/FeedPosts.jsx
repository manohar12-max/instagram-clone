import React, { useEffect, useState } from "react";
import { Container, Flex, Box, VStack,Text } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import useGetFeedPost from "../../hooks/useGetFeedPost";
const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPost();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((ele, index) => (
          <VStack key={index} alignItems={"flex-start"} mb={10} gap={4}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height={"10px"} w={"200px"} />
                <Skeleton height={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length == 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"}>
            Looks like you don&apos;t have any friends.
          </Text>
          <Text color={"red.400"}>Start following and go make some!!</Text>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
