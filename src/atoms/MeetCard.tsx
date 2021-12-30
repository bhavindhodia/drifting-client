import { FC } from "react";
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

export type MeetCardType = {
  id: number;
  title: string;
  teacherID: {
    name: string;
    id: string;
  };
  meetID: {
    id: string;
    join_url: string;
  };
  notes: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  readOnly: boolean;
};

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
          <List spacing={3}>
            <ListItem>
              <ListIcon as={AiOutlineUser} color="green.400" />
              {teacherID.name}
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

export default MeetCard;
