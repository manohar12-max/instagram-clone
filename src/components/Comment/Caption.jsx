import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import  {timeAgo}  from "../../utils/utils";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ post }) => {
	const userProfile = useUserProfileStore((state) => state.userProfile);
    console.log("adsfdgfhjhgffzdgfhghfdsdfgh")
	return (
		<Flex gap={4} bg={"dark gray"} textColor={"white.500"}>
			<Link to={`/${userProfile.username}`}>
				<Avatar src={userProfile.profilePicURL} size={"sm"} />
			</Link>
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					<Link to={`/${userProfile.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
						{userProfile.username}
						</Text>
					</Link>
					<Text fontSize={14}>Caption : {post.caption}</Text>
				</Flex>
				<Text fontSize={12} color={"gray"}>
					{timeAgo(post.createdAt)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Caption;