import React from "react";
import { Heading, Box, Flex, Text, Center } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { AiOutlineClose } from "react-icons/ai";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

const PermissionDenied = ({
  appointmentData,
}: {
  appointmentData: AppointmentModel;
}) => {
  return (
    <Center
      flexDirection={"column"}
      justifyContent={"center"}
      w="100%"
      h="100%"
      pt={6}
      mt={6}
    >
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={AiOutlineClose} color={"white"} w={8} h={8} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Permission denied
      </Heading>
      <Text color={"gray.700"}>
        Sorry,this meet has been created by {appointmentData?.teacherID.name}.
      </Text>
    </Center>
  );
};

export default PermissionDenied;
