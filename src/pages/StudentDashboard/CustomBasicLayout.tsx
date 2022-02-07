import { ComponentType, useContext } from "react";
import { List, ListIcon, ListItem } from "@chakra-ui/layout";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useUserData } from "hooks";
import {
  chakra,
  Box,
  Flex,
  Link,
  useColorModeValue,
  Text,
  Stack,
} from "@chakra-ui/react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

const CustomBasicLayout: ComponentType<AppointmentForm.BasicLayoutProps> = ({
  appointmentData,
  ...restprop
}) => {
  const history = useHistory();
  const { data: userData } = useUserData();

  const appointmentStart = new Date(appointmentData.startDate).toLocaleString();
  const appointmentEnd = new Date(appointmentData.endDate).toLocaleString();
  const result = appointmentData.studentID.find(
    (item: { _id: String; name: String }) => item._id === userData?.user.id
  );

  const onCheckout = (appointmentData: AppointmentModel) => {
    history.push({
      pathname: "/studentDashboard/checkout",
      state: { appointmentData },
    });
  };
  const openMeet = (appointmentData: AppointmentModel) => {
    window.open(appointmentData?.meetID?.join_url, "_blank");
  };
  return (
    <Flex
      w="full"
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={5}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxW="7xl"
        px={4}
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
        bg={useColorModeValue("white", "gray.800")}
        rounded="md"
        shadow="base"
      >
        <Box
          px={[0, 0, 4]}
          py={20}
          borderWidth="1"
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <Box w={["full", "70%", "60%"]} mx="auto">
            <Text
              mb={2}
              fontSize="5xl"
              fontWeight={["bold", "extrabold"]}
              lineHeight="tight"
            >
              $2
              <chakra.span
                fontSize="2xl"
                fontWeight="medium"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {" "}
                refundable
              </chakra.span>
            </Text>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={AiOutlineUser} color="green.400" />
                {appointmentData.teacherID.name}
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineUser} color="green.400" />
                {appointmentStart.toString()}
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineUser} color="green.400" />
                {appointmentEnd.toString()}
              </ListItem>
            </List>

            <Stack
              display={["block", "flex"]}
              spacing={2}
              justifyContent="center"
              direction={["column", "row"]}
            >
              <Link
                onClick={() =>
                  result === undefined
                    ? onCheckout(appointmentData)
                    : openMeet(appointmentData)
                }
                w={["full", "auto"]}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                shadow="md"
                color={useColorModeValue("white", "grey")}
                bg={useColorModeValue("primary.600", "primary.500")}
                _hover={{
                  bg: useColorModeValue("primary.700", "primary.600"),
                }}
              >
                {result === undefined ? `Checkout` : `Meeting`}
              </Link>
              <Link
                w={["full", "auto"]}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                shadow="md"
                color="primary.600"
                bg="white"
                _hover={{
                  bg: "primary.100",
                }}
              >
                Contact Us
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default CustomBasicLayout;
