import { Flex, Stack, HStack, Image } from "@chakra-ui/react";
import { AuthLayout } from "components";
import { SignupForm } from "atoms";

export default function Signup() {
  return (
    <AuthLayout>
      <HStack w="100%">
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            {/*        <Heading fontSize={"2xl"}></Heading> */}
            <SignupForm title="Sign in to your account" />
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={require("assets/img/signup.svg").default}
          />
        </Flex>
      </HStack>
    </AuthLayout>
  );
}
