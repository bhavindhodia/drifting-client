import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

const appointmentUrl = "/appointment/";

/* TEACHER : Get Appointment */
const getAppointments = async (viewName?: string, currentDate?: Date) => {
  const getUrl = `/appointment?viewName=${viewName}&currentDate=${currentDate}`;
  const { data } = await axios.get(getUrl);
  console.log("data", data);
  return data;
};
const useGetAppointment = (viewName?: string, currentDate?: Date) => {
  return useQuery(
    ["getTeacherAppointments", currentDate, viewName],
    () => getAppointments(viewName, currentDate),
    {
      keepPreviousData: true,
      staleTime: 10000,
    }
  );
};

/* TEACHER : Create Appointment */

const createAppointments = async (newData: AppointmentModel) => {
  const { data } = await axios.post(appointmentUrl, {
    appointmentData: newData,
  });
  console.log("data", data);
  return data;
};

const usePostAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    "postTeacherAppointments",
    (newData: AppointmentModel) => createAppointments(newData),
    {
      onSuccess: () => queryClient.invalidateQueries("getTeacherAppointments"),
    }
  );
};

export { useGetAppointment, usePostAppointment };
