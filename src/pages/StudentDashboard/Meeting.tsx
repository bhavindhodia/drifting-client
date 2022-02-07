import { SimpleGrid, Box, Heading } from "@chakra-ui/layout";
import { MeetCard } from "atoms/";
import { MeetCardType } from "types";
import { useGetMeet } from "hooks";
const Meeting = () => {
  const { data: meetData } = useGetMeet();
  console.log("meetData", meetData);

  return meetData !== undefined && meetData.length < 1 ? (
    <Box px={5} minH={"80vh"}>
      <Heading size="lg">No meetings booked</Heading>
    </Box>
  ) : (
    <SimpleGrid
      p={6}
      minH={"80vh"}
      columns={[1, 2, 2, 3]}
      gridTemplateRows={"min-content"}
      bg={"#ddd3f5"}
      gap={5}
    >
      {meetData !== undefined &&
        meetData.map((item: MeetCardType, key: number) => {
          return <MeetCard key={key} {...item} />;
        })}
    </SimpleGrid>
  );
};

export default Meeting;
