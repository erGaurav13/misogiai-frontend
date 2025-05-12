import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Flex,
  Input,
  Button,
  // ,
  
  VStack,
  Text,
  chakra
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import img from "../../img/app.jpeg";
import { login } from "../../Redux/AuthRedux/Auth.Action";
import { Link } from "react-router-dom";

let obj = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const select = useSelector((store) => store.AuthReducer);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  // console.log(select);
  const [form, setForm] = useState(obj);

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handelChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handelSubmit = () => {
    if (!recaptchaValue) {
      return;
    }
    dispatch(login(form));
  };

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <Flex
      bg="#f7f7f7"
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      height="100vh"
      width="100vw"
      align="center"
      justify="center"
    >
      {/* Left Side - Image (Hidden on smaller screens) */}
      <Box
        display={{ base: "none", md: "block" }}
        bgImage={`url(${img})`}
        bgSize="cover"
        bgPosition="center"
        flex="1"
        height={{ base: "auto", md: "100%" }}
      ></Box>

      {/* Right Side - Form */}
      <Box flex="1" bg="#f7f7f7">
        <VStack
          spacing="8"
          p={{ base: "4", sm: "8", md: "12", lg: "16", xl: "20" }}
          // mt={{ base: "18px" }}
          align="left"
        >
          {/* Content above the form */}
          <Text fontSize="2.4rem" fontWeight="bold">
            Welcome to <chakra.span color="#884ebe">CRAFTFOLIO</chakra.span>
            <br />
            {/* Admin Panel */}
          </Text>
          <Text>Login to access your account</Text>

          {/* Login Form */}
          <Box width="100%">
            <>
              <>Email</>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={handelChange}
                name="email"
                focusBorderColor="#884ebe"
              />
            </>
          </Box>

          <Box width="100%">
            <>
              <>Password</>
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={handelChange}
                name="password"
                focusBorderColor="#884ebe"
              />
            </>
          </Box>
          <ReCAPTCHA
            sitekey="6LdosFgpAAAAAEulS6fgoy48JE9TG2LNfhvzCdDY"
            onChange={handleRecaptchaChange}
          />
          <Button
            isLoading={select.login_loading}
            bg="#884ebe"
            _hover={{ bg: "#884ebe" }}
            size="lg"
            width="100%"
            onClick={handelSubmit}
            color={"white"}
          >
            Log in
          </Button>
          <Box>
            <Link to="/signup">
              <Text color="blue">Create an account? Signup</Text>
            </Link>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
