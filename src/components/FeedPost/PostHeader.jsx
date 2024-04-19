import React from "react";
import {
  Flex,
  Box,
  Image,
  Avatar,
  Text,
  SkeletonCircle,
  Skeleton,Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser"
import { timeAgo } from "../../utils/utils";
const PostHeader = ({ post, creatorProfile }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser( post.createdBy);
  return (
    <Flex my={2} justifyContent={"space-between"} alignItems={"center"}>
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL} alt="user" size={"md"} />
          </Link>
        ) : (
          <SkeletonCircle size="10" />
        )}

        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              {" "}
              {creatorProfile.username}
            </Link>
          ) : (
            <Skeleton w={"100%"} h={"10px"} />
          )}

          <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
          isLoading={isUpdating}
          onClick={handleFollowUser}
          bg="transparent"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
