import { axiosClient } from "services";
import { useQuery } from "react-query";
import { MeetCardType } from "atoms/MeetCard";

/* TEACHER : Get Meetings */
const getMeets = async () => {
  const getUrl = `appointment/meetings`;
  const { data } = await axiosClient.get(getUrl);
  return data;
};
const useGetMeet = () => {
  return useQuery<[MeetCardType]>(["getMeets"], () => getMeets(), {
    keepPreviousData: true,
    staleTime: 10000,
  });
};

export { useGetMeet };
