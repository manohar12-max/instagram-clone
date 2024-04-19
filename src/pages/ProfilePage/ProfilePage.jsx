import React from 'react'
import {Flex ,Box ,Container,VStack,Text,Skeleton,SkeletonCircle }  from '@chakra-ui/react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTabs from '../../components/Profile/ProfileTabs'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername"
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'
const ProfilePage = () => {
  //the variable to extract is named as username because in app.js we have set path as /:username
  const { username } = useParams();
  
 
	const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const userNotFound =!isLoading &&!userProfile
  if(userNotFound){
   return <UserNotFound/>
  }
  return (
    <Container maxW='container.lg' py={5}>
    <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
    {!isLoading && userProfile && <ProfileHeader />}
				{isLoading && <ProfileHeaderSkeleton />}

    </Flex>
    <Flex
      px={{ base: 2, sm: 4 }}
      maxW={"full"}
      mx={"auto"}
      borderTop={"1px solid"}
      borderColor={"whiteAlpha.300"}
      direction={"column"}
    >
      <ProfileTabs />
      <ProfilePosts />
    </Flex>
  </Container>
  )
}

export default ProfilePage

const UserNotFound=()=>{
  return (
    <Flex
      textAlign={"center"}
      mx={"auto"}
      direction={"column"}
    >
      <Text fontSize={"2x1"}>User Not Found</Text>
      <Link to="/"> Go Home</Link>
    </Flex>
  )
}
// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};