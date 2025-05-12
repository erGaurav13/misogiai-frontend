
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  chakra,
  Input,
  Fieldset,
  Field,
  NativeSelect,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import img from "../../img/app.jpeg";
import { signup } from "../../Redux/AuthRedux/Auth.Action";
import { Link } from "react-router-dom";

const defaultForm = {
  username: "",
  email: "",
  password: "",
  displayName: "",
  bio: "",
  avatarUrl: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const select = useSelector((store) => store.AuthReducer);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.username) formErrors.username = "Username is required";
    if (!form.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      formErrors.email = "Invalid email format";
    if (!form.password) formErrors.password = "Password is required";
    else if (form.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    return formErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    if (!recaptchaValue) {
      return;
    }
    dispatch(signup(form));
  };

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  return (
    <Flex
    height="100vh"
    width="100vw"
    overflow="hidden"
    direction={{ base: "column", md: "row" }}
  >
    {/* Left Side Image */}
    <Box
      display={{ base: "none", md: "flex" }}
      flex="1"
      backgroundImage={`url(${img})`}
      backgroundSize="cover"
      backgroundPosition="center"
    />
  
    {/* Right Side Form */}
    <Flex
      flex="1"
      bg="#f7f7f7"
      align="center"
      justify="center"
      py={{ base: 2, md: 0 }}
      px={{ base: 1, md: 10 }}
      overflowY="auto"
    >
      <Stack
        spacing={2}
        width="100%"
        maxW="lg"
        textAlign="left"
        pt={12}
      >
        {/* Headings */}
        <Box mt='40'>
          <Text fontSize="3xl" fontWeight="bold">
            Welcome to{" "}
            <chakra.span color="#884ebe">CRAFTFOLIO</chakra.span>
          </Text>
          <Text fontSize="md" mt={1}>
            Create your account here
          </Text>
        </Box>
  
        {/* Form Fields */}
        <Fieldset.Root size="lg">
          <Fieldset.Legend>Account Information</Fieldset.Legend>
   
          <Fieldset.Content>
            {[
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Display Name", name: "displayName", type: "text" },
              { label: "Bio", name: "bio", type: "text" },
              { label: "Avatar URL", name: "avatarUrl", type: "text" },
            ].map(({ label, name, type }) => (
              <Field.Root key={name}>
                <Field.Label>{label}</Field.Label>
                <Input
                  type={type}
                  name={name}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  onChange={handleChange}
                  focusBorderColor="#884ebe"
                  isInvalid={errors[name]}
                />
                {errors[name] && (
                  <Text color="red.500" fontSize="sm">
                    {errors[name]}
                  </Text>
                )}
              </Field.Root>
            ))}
          </Fieldset.Content>
        </Fieldset.Root>
  
        {/* Recaptcha */}
        <ReCAPTCHA
          sitekey="6LdosFgpAAAAAEulS6fgoy48JE9TG2LNfhvzCdDY"
          onChange={handleRecaptchaChange}
        />
  
        {/* Submit Button */}
        <Button
          isLoading={select.signup_loading}
          bg="#884ebe"
          _hover={{ bg: "#6d3db5" }}
          size="lg"
          width="100%"
          onClick={handleSubmit}
          color="white"
        >
          Sign Up
        </Button>
  
        {/* Login Link */}
        <Box textAlign="center">
          <Link to="/login">
            <Text color="blue.500">Already have an account? Log in</Text>
          </Link>
        </Box>
      </Stack>
    </Flex>
  </Flex>
  
  );
  
};

export default Signup;

// import React from 'react'

// export default function Signup() {
//   return (
//     <div>
//       hello

//     </div>
//   )
// }
