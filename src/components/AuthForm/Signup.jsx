import React from "react";
import { Input, InputGroup, InputRightElement, Button,Alert } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
     
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        name="email"
        value={input.email}
        size={"sm"}
        onChange={(e) => {
          setInput({ ...input, email: e.target.value });
        }}
      />
      <Input
        placeholder="username"
        fontSize={14}
        type="username"
        name="username"
        value={input.username}
        size={"sm"}
        onChange={(e) => {
          setInput({ ...input, username: e.target.value });
        }}
      />
      <Input
        placeholder="fullname"
        fontSize={14}
        type="fullname"
        name="fullname"
        value={input.fullname}
        size={"sm"}
        onChange={(e) => {
          setInput({ ...input, fullname: e.target.value });
        }}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          name="password"
          value={input.password}
          size={"sm"}
          onChange={(e) => {
            setInput({ ...input, password: e.target.value });
          }}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* if error occured after submit */}
      {error && (
        <Alert
          status="error"
          fontSize={13}
          borderRadius={4}
        >
          {error.message}
        </Alert>
      )
      
      }
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={() => {signup(input)}}
        isLoading={loading} //here isLoading is inbuilt in button of chakara
        //loading is returned from hook above
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
