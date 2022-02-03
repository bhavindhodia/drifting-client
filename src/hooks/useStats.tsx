import { useQuery } from "react-query";
import { axiosClient } from "services";

export interface Stats {
  success: boolean;
  cardStatsData: CardStatsData;
  chartStatsData: ChartStatsData[];
}

export interface CardStatsData {
  todaysMeet: number;
  upCommingMeet: number;
  registeredStudent: number;
}
export interface ChartStatsData {
  _id: string;
  name: string;
  studentRegistered: number;
}

/* TEACHER : Get Stats */
const getStats = async () => {
  const getUrl = `/appointment/data`;
  const { data } = await axiosClient.get(getUrl);

  /* console.log("data", data); */
  return data;
};
const useAppointmentStats = () => {
  return useQuery<Stats, Error>(["getCardStats"], () => getStats(), {
    keepPreviousData: true,
    staleTime: 10000,
  });
};

export { useAppointmentStats };
