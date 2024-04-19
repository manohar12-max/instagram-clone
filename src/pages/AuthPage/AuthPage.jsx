import React from "react";
import {
  Flex,
  Center,
  Text,
  Box,
  Square,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10} >
          <Box display={{ base: "none", md: "block" }}>
            <Image h={650} src="/public/auth.png" />
          </Box>
          <VStack spacing={4} align={"stretch"}>
          <AuthForm />
          <Box textAlign={"center"}>
            Get the app
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={10} />
              <Image src="/microsoft.png" h={10} />
            </Flex>
          </Box>
        </VStack>
        </Flex>

       
      </Container>
    </Flex>
  );
};

export default AuthPage;
