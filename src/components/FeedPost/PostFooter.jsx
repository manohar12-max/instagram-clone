import React, { useState, useRef } from "react";
import {
  Container,
  Flex,
  Box,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useDisclosure
} from "@chakra-ui/react";
import {
  NotificationsLogo,
  UnlikeLogo,
  CommentLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import {timeAgo} from "../../utils/utils"
import CommentsModal from "../../modals/CommentsModal";
const PostFooter = ({ post, username, isProfilePage, creatorProfile }) => {
  const [comment, setComment] = useState("");
  const { isCommenting, handlePostComment } = usePostComment();
  const authUser = useAuthStore();
  const commentRef = useRef(null);
  const { isUpdating, isLiked, likes, handleLikePost } = useLikePost(post);
  const {isOpen,onOpen,onClose}=useDisclosure()
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box my={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => {
            commentRef.current.focus();
          }}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontSize={"sm"} fontWeight={600}>
        {likes} likes
      </Text>
      <Text fontSize={'12'} color={"gray"}>
        Posted {timeAgo(post.createdAt)}
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700} >
            {creatorProfile?.username}{" "}
            <Text as="span" fontSize={"sm"} fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize={"sm"} color={"gray"} fontWeight={600} cursor={"pointer"} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
          )}
          {/* comments modal only for home page */}
          {isOpen ? (<CommentsModal isOpen={isOpen} onClose={onClose} post={post}/>):(null)}
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment ...."}
              fontSize={14}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                fontWeight={600}
                color={"blue.500"}
                _hover={{
                  color: "white",
                }}
                cursor={"pointer"}
                bg={"transparent"}
                isLoading={isCommenting}
                onClick={handleSubmitComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
