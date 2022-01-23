import {
  Heading,
  Box,
  Center,
  Avatar,
  useDisclosure,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserData } from "hooks";
import { ProfileModal, PasswordModal } from "atoms";

const Profile = () => {
  const { data: userData } = useUserData();

  console.log("udata", userData);
  const {
    isOpen: ProfileIsOpen,
    onOpen: ProfileOnOpen,
    onClose: ProfileOnClose,
  } = useDisclosure();
  const {
    isOpen: PasswordIsOpen,
    onOpen: PasswordOnOpen,
    onClose: PasswordOnClose,
  } = useDisclosure();

  return (
    <Center minH={"100vh"} py={6}>
      <ProfileModal
        isOpen={ProfileIsOpen}
        onClose={ProfileOnClose}
        userData={userData}
      />
      <PasswordModal
        isOpen={PasswordIsOpen}
        onClose={PasswordOnClose}
        userData={userData}
      />
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          name={userData?.user.name}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {userData?.user.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          @{userData?.user.username}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          EmailID - {userData?.user.email}
        </Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            onClick={PasswordOnOpen}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Password
          </Button>
          <Button
            onClick={ProfileOnOpen}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Edit
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Profile;
