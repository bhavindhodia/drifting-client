import { useEffect, useState } from "react";
import { SimpleGrid, Spacer } from "@chakra-ui/layout";

import { MeetCard } from "atoms";
import a from "axios";
import { MeetCardType } from "atoms/MeetCard";
import { axiosClient } from "services";

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

      //      console.log("appointmentData", appointmentData);
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

export default Meeting;
