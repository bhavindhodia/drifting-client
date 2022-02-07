import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useToast, UseToastOptions, ToastId } from "@chakra-ui/react";
import { MyPaymentIntent } from "types";
import { axiosClient } from "services";
const paymentUrl = "payment";

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

/* TEACHER : Get all Payments */
const getPayments = async () => {
  const getUrl = `/${paymentUrl}/getAll`;
  const { data } = await axiosClient.get(getUrl);

  console.log("paymentIntentdata", data);
  return data;
};
const useGetPayments = () => {
  return useQuery(["getAllPayments"], () => getPayments(), {
    keepPreviousData: true,
    staleTime: 10000,
  });
};

/* TEACHER : Create Single Refund */
const singleRefund = async (paymentIntent: MyPaymentIntent) => {
  const deleteUrl = `/${paymentUrl}/refund/${paymentIntent.id}`;
  const { data } = await axiosClient.post(deleteUrl, {
    paymentId: paymentIntent._id,
  });
  console.log("paymentIntentdata", data);
  return data;
};
const useSingleRefund = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    "singleRefund",
    (paymentIntent: MyPaymentIntent) => singleRefund(paymentIntent),
    {
      onSuccess: (data) => {
        console.log("onSuccess", data);
        if (data.success) {
          showToast(toast, data, `Successfully refunded`);
        } else {
          showToast(toast, data, data?.errorMessage);
        }
        queryClient.invalidateQueries("getAllPayments");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) console.log("onError", error.message);
      },
    }
  );
};

export { useGetPayments, useSingleRefund };
