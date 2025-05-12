// UnauthorizedPage.js
import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link if you are using React Router

const UnauthorizedPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Heading as="h1" size="xl" mb="4" color="#cb1b5b">
        Unauthorized Access
      </Heading>
      <Text fontSize="lg" mb="8" >
        You are not authorized to access this page.
      </Text>
      <Button
        bg="white"
        color="#cb1b5b"
        border="1px solid #cb1b5b"
        as={Link}
        to="/"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
