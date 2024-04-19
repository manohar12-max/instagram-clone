import React, { useState , } from "react";
import {useNavigate} from "react-router-dom"
import Login from "./Login";
import Signup from "./Signup";
import {
  Flex,
  Box,
  VStack,
  Image,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogIn, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack>
          <Image src="/public/logo.png" cursor={"pointer"} alt="Instagram" />
         
         {isLogIn ? <Login/>:<Signup/>}
         
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth prefix={ isLogIn ? "Log in":"Sign up"}/>
        </VStack>
      </Box>
      <Flex justifyContent={"center"} alignItems={"center"} cursor={"pointer"}>
        <Box mx={2} fontSize={14}>
          {isLogIn ? "Don't have an account?" : "Already have an account"}
        </Box>
        <Box
          onClick={() => {
            setIsLogin(!isLogIn);
          }}
          color={"blue.500"}
        >
          {isLogIn ? "Sign Up" : "Sign In"}
        </Box>
      </Flex>
    </>
  );
};

export default AuthForm;
