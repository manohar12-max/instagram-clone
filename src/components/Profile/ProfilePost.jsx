import React, { useState } from "react";
import {
  Flex,
  Box,
  Container,
  VStack,
  Text,
  Image,
  Button,
  Grid,
  Avatar,
  GridItem,
  Skeleton,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPost/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast"
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../FireBase/firebase";
import { deleteDoc, doc, updateDoc,arrayRemove } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";
const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast=useShowToast()
 const [isDeleting,setIsDeleting]=useState(false)
 const deletePost=usePostStore(state=> state.deletePost)
 const decrementPostsCount=useUserProfileStore((state)=>state.deletePost)
 const handleDeletePost = async () => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;
  if (isDeleting) return;
  setIsDeleting(true);
  try {
    const imageRef = ref(storage, `posts/${post.id}`);
    await deleteObject(imageRef);
    const userRef = doc(firestore, "users", authUser.uid);
    await deleteDoc(doc(firestore, "posts", post.id));

    await updateDoc(userRef, {
      posts: arrayRemove(post.id),
    });

    deletePost(post.id);
    decrementPostsCount(post.id);
    showToast("Success", "Post deleted successfully", "success");
  } catch (error) {
    showToast("Error", error.message, "error");
  } finally {
    setIsDeleting(false);
  }
};
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{
            opacity: 1,
          }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          w={"100%"}
          height={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // to make modal pop in centwe of screev
        isCentered={true}
        size={{ base: "3xl", md: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={"1.5"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="img" h={"full"} />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfile.profilePicURL} size={"sm"} />
                    <Text fontSize={12} fontWeight={"bold"}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"300px"}
                  overflowY={"auto"}
                >
                {post.caption &&  <Caption post={post}/>} 
                 {
                  post.comments.map((comment,index)=>(
                    <Comment
                      key={index}
                      comment={comment}
                    />
                  ))
                 }
                 
                </VStack>
                <Divider my={4} bg={"gray.500"} />
                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
