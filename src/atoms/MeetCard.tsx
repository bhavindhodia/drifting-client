import { FC } from "react";
import {
  Heading,
  Box,
  Text,
  Flex,
  Stack,
  Button,
  Spacer,
  Avatar,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useIsAuthenticated, useDeleteAppointment } from "hooks";
import { MeetCardType } from "types";

const CustomTag = ({ name }: { name: string }) => (
  <Tag size="lg" mx={1} colorScheme={"purple"} borderRadius="full">
    <Avatar size="xs" name={name} ml={-1} mr={2} />
    <TagLabel>{name}</TagLabel>
  </Tag>
);

const MeetCard: FC<MeetCardType> = ({
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
          {userAuth?.role.toString() === "STUDENT" || studentID.length < 1 ? (
            <Text size={"sm"} h="100px" overflow={"auto"}>
              By {notes}
            </Text>
          ) : (
            studentID.map((item: { id: string; name: string }) => (
              <Box h="100px" overflow={"auto"}>
                <CustomTag key={item.id} name={item.name} />
              </Box>
            ))
          )}
        </Box>
      </Flex>
      <Stack mt={8} alignItems={"flex-end"} direction={"row"} spacing={4}>
        {userAuth?.role.toString() === "TEACHER" && (
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
        )}
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
