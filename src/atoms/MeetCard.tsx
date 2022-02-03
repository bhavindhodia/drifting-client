import { FC } from "react";
import {
  Heading,
  Box,
  Center,
  Text,
  Flex,
  Stack,
  Button,
  List,
  ListIcon,
  Spacer,
  ListItem,
  Tag,
  TagLabel,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BiTimeFive, BiTime } from "react-icons/bi";
import { useIsAuthenticated, useDeleteAppointment } from "hooks";

export type MeetCardType = {
  id: number;
  title: string;
  teacherID: {
    name: string;
    id: string;
  };
  studentID: [
    {
      name: string;
      id: string;
    }
  ];
  meetID: {
    id: string;
    join_url: string;
    start_url: string;
  };
  notes: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  readOnly: boolean;
};

const CustomTag = ({ name }: { name: string }) => (
  <Tag size="lg" mx={1} colorScheme={"purple"} borderRadius="full">
    <Avatar size="xs" name={name} ml={-1} mr={2} />
    <TagLabel>{name}</TagLabel>
  </Tag>
);

const MeetCard: FC<MeetCardType> = ({
  title,
  notes,
  startDate,
  endDate,
  meetID,
  teacherID,
}) => {
  const appointmentStart = new Date(startDate).toLocaleString();
  const appointmentEnd = new Date(endDate).toLocaleString();

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {title}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {notes}
        </Text>
        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List alignItems={"left"} spacing={3}>
            <ListItem>
              <ListIcon as={AiOutlineUser} color="green.400" />
              {teacherID.name}
            </ListItem>
            <ListItem>
              <ListIcon as={BiTime} color="green.400" />
              {appointmentStart.toString()}
            </ListItem>
            <ListItem>
              <ListIcon as={BiTimeFive} color="green.400" />
              {appointmentEnd.toString()}
            </ListItem>
          </List>
        </Box>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Cancel
          </Button>
          <Button
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
            onClick={() => window.open(meetID.join_url)}
          >
            Meet
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

const TeacherMeetCard: FC<MeetCardType> = ({
  id,
  title,
  notes,
  startDate,
  endDate,
  meetID,
  teacherID,
  studentID,
}) => {
  const { data: userAuth } = useIsAuthenticated();
  const deleteAppointment = useDeleteAppointment();

  console.log("id", id);
  const date = new Date(startDate).getDate();
  const weekDay = new Date(startDate).toLocaleDateString(navigator.language, {
    weekday: "long",
  });
  const month = new Date(startDate).toLocaleDateString(navigator.language, {
    month: "long",
  });
  const appointmentStartTime = new Date(startDate).toLocaleTimeString(
    navigator.language,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const appointmentEndTime = new Date(endDate).toLocaleTimeString(
    navigator.language,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <Box bgColor={"white"} py={3} px={5} minH="300px" borderRadius={"5px"}>
      <Flex py={2} my={1} borderBottom="1px" borderColor="gray.300">
        <Box>
          <Heading as={"h5"} size={"sm"}>
            {appointmentStartTime.toString()}- {appointmentEndTime.toString()}
          </Heading>
          <Text color={"gray"} size={"xs"}>
            {weekDay.toString()}, {month.toString()} {date.toString()}
          </Text>
        </Box>
        <Spacer />
        <Avatar mb={"2"} name={teacherID.name} />
      </Flex>
      <Flex py={2} my={1} borderBottom="1px" borderColor="gray.300">
        <Box>
          <Heading as={"h5"} size={"sm"}>
            {title}
          </Heading>
          <Text color={"gray"} size={"xs"}>
            By {teacherID.name}
          </Text>
        </Box>
      </Flex>
      <Flex py={2} my={1} borderBottom="1px" borderColor="gray.300">
        <Box>
          {studentID.length > 0 ? (
            studentID.map((item: { id: string; name: string }) => (
              <CustomTag key={item.id} name={item.name} />
            ))
          ) : (
            <Text size={"sm"} h="100px" overflow={"auto"}>
              By {notes}
            </Text>
          )}
        </Box>
      </Flex>
      <Stack mt={8} alignItems={"flex-end"} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
          bgColor={"red.400"}
          onClick={() => deleteAppointment.mutate(id)}
        >
          Delete
        </Button>
        <Button
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
          onClick={() =>
            userAuth?.role.toString() === "TEACHER"
              ? window.open(meetID.start_url)
              : window.open(meetID.join_url)
          }
        >
          Meet
        </Button>
      </Stack>
    </Box>
  );
};

export default MeetCard;
export { TeacherMeetCard };
