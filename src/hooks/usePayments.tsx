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
const getPayments = async () => {
  const getUrl = `/payment/getAllPayments`;
  const { data } = await axios.get(getUrl);

  /*   console.log("data", data); */
  return data;
};
const useGetPayments = () => {
  return useQuery(["getTeacherAppointments"], () => getPayments(), {
    keepPreviousData: true,
    staleTime: 10000,
  });
};

export { useGetPayments };
