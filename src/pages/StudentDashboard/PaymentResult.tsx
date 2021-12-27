import { Box, Heading, Text, Icon, Flex, Button, Link } from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai";
import { Link as ReactLink } from "react-router-dom";

export default function PaymentResult() {
  return (
    <Box textAlign="center" minH="80vh" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"green.100"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={FcApproval} color={"green.800"} w={8} h={8} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Payment Success
      </Heading>
      <Text color={"gray.700"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>

      <Link as={ReactLink} to="/studentDashboard">
        <Button
          mt={16}
          px={10}
          py={6}
          bg="success"
          leftIcon={<AiOutlineHome size={30} />}
          iconSpacing={6}
          //onClick={()=>}
        >
          <Heading as="h3" size="md">
            Home
          </Heading>
        </Button>
      </Link>
    </Box>
  );
}
