import { useEffect, useState } from "react";
import { SimpleGrid, Spacer, Grid, Flex } from "@chakra-ui/layout";

import { MeetCard } from "atoms";
import a from "axios";
import { MeetCardType, TeacherMeetCard } from "atoms/MeetCard";
import { axiosClient } from "services";
import { useGetMeet } from "hooks";

const Meeting = () => {
  useEffect(() => {
    getMeets();
  }, []);

  const [meetData, setMeetData] = useState<MeetCardType[]>([]);

  const getMeets = async () => {
    const getMeetUrl = "appointment/meetings";
    try {
      const response = await axiosClient.get(getMeetUrl);
      let appointmentData = response.data;
      setMeetData(appointmentData);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("meetData", meetData);

  return (
    <SimpleGrid minChildWidth="320px" spacing="1.5rem">
      {meetData.map((item: MeetCardType, key: number) => {
        return (
          <>
            <MeetCard key={key} {...item} />
            <Spacer />
          </>
        );
      })}
    </SimpleGrid>
  );
};
const TeacherMeeting = () => {
  /* useEffect(() => {
    getMeets();
  }, []);

  const [meetData, setMeetData] = useState<MeetCardType[]>([]);

  const getMeets = async () => {
    const getMeetUrl = "appointment/meetings";
    try {
      const response = await axiosClient.get(getMeetUrl);
      let appointmentData = response.data;
      setMeetData(appointmentData);
    } catch (error) {
      console.log("error", error);
    }
  }; */

  const { data: meetData } = useGetMeet();
  console.log("meetData", meetData);

  return (
    <SimpleGrid
      p={6}
      minH={"80vh"}
      columns={[1, 2, 2, 3]}
      gridTemplateRows={"min-content"}
      // row={[3, 2, 2]}
      bg={"#ddd3f5"}
      gap={5}
    >
      {meetData !== undefined &&
        meetData.map((item: MeetCardType, key: number) => {
          return <TeacherMeetCard key={key} {...item} />;
        })}
    </SimpleGrid>
  );
};

export default Meeting;
export { TeacherMeeting };
