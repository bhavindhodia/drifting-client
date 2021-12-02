import React, { useContext } from "react";
import {
  Heading,
  Box,
  Flex,
  Image,
  Avatar,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "services/AuthContext";
const Profile = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Box>
      <Flex
        direction="column"
        minH="full"
        minW="full"
        bg="gray.100"
        py={[6, 12]}
        justify="center"
      >
        <Box pos="relative" py={3} maxW={{ sm: "xl" }} mx={{ sm: "auto" }}>
          <Box
            pos="absolute"
            inset={0}
            bgGradient="linear(to-r,cyan.400,blue.500)"
            shadow="lg"
            transform={["skewY(-6deg)", "rotate(-6deg)"]}
            rounded={{ sm: "3xl" }}
          ></Box>
          <Box
            pos="relative"
            px={10}
            py={20}
            bg="white"
            shadow="lg"
            rounded={{ sm: "3xl" }}
            p={{ sm: 6 }}
          >
            <Box
              w={"100%"}
              bg={"gray.100"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Image
                h={"220px"}
                w={"400px"}
                src={
                  "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=834&q=70"
                }
                objectFit={"cover"}
              />
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  }
                  alt={"Author"}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {auth.userData?.name}
                  </Heading>
                  <Text color={"gray.500"}>9th Grade</Text>
                </Stack>

                {/*   <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>
 */}
                <Button
                  w={"full"}
                  mt={8}
                  bg={"secondary"}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  {auth.userData?.email}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
