import { Box, Flex, Button, Text, HStack, Image } from "@chakra-ui/react";
import {
  FaHome,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
  FaList,
} from "react-icons/fa"; // Importing icons
import { Link } from "react-router-dom";
import img from "../../img/logo.png";
const Navbar = () => {
  return (
    <>
      <Box
        bg="#884ebe"
        p={1.5}
        width="100%"
        position="fixed"
        top="0"
        left="0"
        zIndex="1000"
      >
        <Flex align="center" justify="space-between" width="100%">
          {/* Left Side */}
          <Flex align="center">
            <Image src={img} alt="Logo" boxSize="40px" mr={4} /> {/* Logo */}
            <HStack>
              <Link to="/list-casestudy">
                <Button color="black" variant="solid">
                  <FaList color="blue" /> Case-Studies
                </Button>
              </Link>
              <Button colorScheme="teal" variant="ghost" m={2}>
                <FaChartBar color="blue" /> Analytics
              </Button>
            </HStack>
          </Flex>

          {/* Right Side */}
          <Flex align="center">
            <Text color="white" mr={4}>
              Username
            </Text>
            <HStack>
              <Button colorScheme="black" variant="solid" m={2} color={"black"}>
                <FaSignOutAlt color="blue" /> Logout
              </Button>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
