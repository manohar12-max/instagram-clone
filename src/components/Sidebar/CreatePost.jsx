import { Box, Flex, Tooltip,Textarea,Input ,Button,Text,Image, CloseButton} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure
  }from '@chakra-ui/react'
  import { BsFillImageFill } from "react-icons/bs";
  import { useRef ,useState} from "react";
  import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore"
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { firestore,storage } from "../../FireBase/firebase";
import { doc, setDoc, collection, arrayUnion ,addDoc,updateDoc} from "firebase/firestore"
import { getDownloadURL,uploadString ,ref} from "firebase/storage";
const CreatePost = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const fileRef=useRef(null);
	const [caption,setCaption]=useState("")
	const { selectedFile, handleImageChange, setSelectedFile }=usePreviewImg();
	const {isLoading,handleCreatePost}=useCreatePost();
	const showToast=useShowToast()    

	const handlePostCreation=async()=>{
		try{
          await handleCreatePost(selectedFile,caption);
		  
		  onClose();
		  setCaption("");
	      setSelectedFile(null);
		}catch(error){
			showToast("Error","Please select a file","error")
		}
	}
	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
				
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>
			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' value={caption} onChange={(e)=>{setCaption(e.target.value)}} />
						<Input type='file' hidden ref={fileRef}  onChange={handleImageChange}/>
						<BsFillImageFill
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={25}
							onClick={()=>fileRef.current.click()}
						/>
						{selectedFile ? (<Flex mt={5} position={"relative"} justifyContent={"center"} >
                         <Image src={selectedFile} alt="Image " />
						 <CloseButton 
						 position={"absolute"}
						 top={2}
						 right={2}
						 onClick={()=>{
							setSelectedFile(null);
						 }}  />
						</Flex>):(<Text fontSize={"sm"} fontWeight={600} >
                            Upload Image
                        </Text>)}
						
					</ModalBody>
					<ModalFooter>
						<Button mr={3} isLoading={isLoading} onClick={handlePostCreation} >Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> 
		</>
	);
};

export default CreatePost;

// hook to create posst
function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		
		if (!selectedFile) throw new Error("Please select an image");


		setIsLoading(true);
		// db of new post
		const newPost = {
			caption: caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost); // create & add collection
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id }); //this weill add post in posts store

			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id }); //this will add id in user in UserProfile
         
			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}