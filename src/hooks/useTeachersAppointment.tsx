import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { AuthContext } from "services/AuthContext";
import { useToast, UseToastOptions, ToastId } from "@chakra-ui/react";

const appointmentUrl = "/appointment/";

/* Toast Message */
const showToast = (
  toast: (options?: UseToastOptions | undefined) => ToastId | undefined,
  data: any,
  successMessage: string
) => {
  if (data.errorMessage) {
    toast({
      status: "error",
      isClosable: true,
      description: data.errorMessage,
    });
  }

  if (data.success) {
    toast({
      status: "success",
      isClosable: true,
      description: successMessage,
    });
  }
};

/* TEACHER : Get Appointment */
const getAppointments = async (viewName?: string, currentDate?: Date) => {
  const getUrl = `/appointment?viewName=${viewName}&currentDate=${currentDate}`;
  const { data } = await axios.get(getUrl);

  /* console.log("data", data); */
  return data;
};
const useGetAppointment = (viewName?: string, currentDate?: Date) => {
  return useQuery(
    ["getTeacherAppointments", viewName, currentDate],
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
  /*  console.log("data", data); */
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

/* TEACHER : Get Student List */
const getStudentList = async () => {
  const getUrl = `/appointment/getUserByRole/student`;
  let { data } = await axios.get(getUrl);
  if (data?.studentList !== undefined) {
    data = data?.studentList.map(
      (item: { id: string; name: string }, key: string) => {
        return { value: item.id, label: item.name };
      }
    );
  }
  console.log("Fetched data", data);
  return data;
};

const useGetStudentList = () => {
  return useQuery(["getStudentList"], () => getStudentList(), {
    keepPreviousData: true,
    staleTime: 10000,
  });
};

/* Teacher : Update Appointment Data */
const updateAppointments = async (
  appointmentID: string | number,
  newData:
    | AppointmentModel
    | {
        [key: string]: any;
      }
) => {
  const { data } = await axios.patch(`/appointment/${appointmentID}`, {
    appointmentData: newData,
  });
  return data;
};
const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    "patchAppointments",
    (
      newData:
        | AppointmentModel
        | {
            [key: string]: any;
          }
    ) => updateAppointments(newData.id, newData),
    {
      onSuccess: (data) => {
        showToast(toast, data, `Successfully updated`);
        queryClient.invalidateQueries("getTeacherAppointments");
      },
    }
  );
};

/* TEACHER : Deleted Appointment */
const deleteAppointments = async (appointmentID: string | number) => {
  const deleteUrl = `/appointment/${appointmentID}`;
  const { data } = await axios.delete(deleteUrl);
  return data;
};
const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    "deleteAppointment",
    (appointmentID: string | number) => deleteAppointments(appointmentID),
    {
      onSuccess: (data) => {
        showToast(
          toast,
          data,
          `Successfully deleted ${data.appointmentResponse.title}`
        );
        queryClient.invalidateQueries("getTeacherAppointments");
      },
    }
  );
};

export {
  useGetAppointment,
  usePostAppointment,
  useGetStudentList,
  useUpdateAppointment,
  useDeleteAppointment,
};
