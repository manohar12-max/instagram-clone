import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
const EditProfile = ({ isOpen, onClose }) => {
  const [input, setInput] = useState({ fullName: "", username: "", bio: "" });
  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const showToast=useShowToast()
  //about image
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const  {editProfile,isUpdating}=useEditProfile()
  const handleEditProfile=async ()=>{
    try {
      await editProfile(input,selectedFile)
      setSelectedFile(null)
      onClose();
    }catch(error){
   showToast("Error", error.message,"error")
    }
  }
  
  return (
    <>
    {console.log(selectedFile)}
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid gray"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack spacing={6}>
                    <Center>
                      {/* if the change of image is succesfull we will get base 64 in selectedfile */}
                      <Avatar size="xl" src={selectedFile || authUser.profilePicURL} border={"2px solid white "} />
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={()=>fileRef.current.click()}>Edit Profile Picture</Button>
                    </Center>
                    {/* to get input image from computer we have used input type file
                    and later we have hidden that with reference help we have given it 
                    to editprofile button */}
                      <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                  <Input
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                    value={input.fullName || authUser.fullName}
                    onChange={(e)=>{setInput({...input,fullName:e.target.value})}}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                    value={input.username || authUser.username}
                    onChange={(e)=>{setInput({...input,username:e.target.value})}}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"} value={input.bio}>
                    Bio
                  </FormLabel>
                  <Input placeholder={"Bio"} 
                  size={"sm"} 
                  type={"text"} 
                  value={input.bio||authUser.bio}
                  onChange={(e)=>{setInput({...input,bio:e.target.value})}}
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
