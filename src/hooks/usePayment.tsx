import axios from "axios";
import { axiosClient } from "services";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { showToast, showMyToast } from "atoms";
import { useToast } from "@chakra-ui/toast";
import { UserDataType } from "services/AuthContext";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { PaymentIntent, PaymentIntentResult } from "@stripe/stripe-js";

/* Base URL */
const baseURL = "payment";

/* Student : Create payment intent */

const createIntent = async (
  userData: UserDataType,
  appointmentData: AppointmentModel
) => {
  const createIntetnUrl = `/${baseURL}/create-payment-intent/`;
  const response = await axiosClient.post<any>(
    createIntetnUrl,
    {
      userData,
      appointmentData,
    }
    /*    {
      timeout: 5,
      timeoutErrorMessage: "Connection error occured",
    } */
  );
  return response.data;
};

const usePaymentIntent = () => {
  let toast = useToast();
  return useMutation(
    "createPaymentIntent",

    ({
      userData,
      appointmentData,
    }: {
      userData: UserDataType;
      appointmentData: AppointmentModel;
    }) => createIntent(userData, appointmentData),
    {
      onSuccess: (data: {
        success: boolean;
        errorMessage?: string;
        paymentIntent: PaymentIntent;
      }) => {
        console.log("createPaymentIntent", data);
        if (data.success) {
        } else {
          if (data.errorMessage !== undefined) {
            console.log("errorM", data);
            showToast(toast, data);
          }
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          console.log("createPaymentIntentError", error.response);
          showMyToast(toast, "error", error.message);
        }
      },
    }
  );
};

/* STUDENT : Get Publishable Key for Card Element */
const getKey = async () => {
  const keyUrl = `${baseURL}/publishable-key`;
  const { data } = await axiosClient.get(keyUrl);
  return data;
};
const usePublishableKey = () => {
  return useQuery<{ success: boolean; pKey: string }, Error>(
    "getPublishableKey",
    () => getKey()
  );
};

export { usePaymentIntent, usePublishableKey };
