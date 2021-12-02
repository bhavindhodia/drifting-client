import { Flex, Heading, Stack, Image } from "@chakra-ui/react";
import LoginForm from "atoms/LoginForm";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Log in to your account</Heading>
          <LoginForm />
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={require("assets/img/login.svg").default}
        />
      </Flex>
    </Stack>
  );
}
