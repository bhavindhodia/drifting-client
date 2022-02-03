import React, { useState, useEffect, useContext, FC } from "react";
import {
  loadStripe,
  StripeElementsOptions,
  Appearance,
  PaymentIntentResult,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import { Redirect, useLocation } from "react-router-dom";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { usePaymentIntent, useUserData } from "hooks";
import { usePublishableKey } from "hooks/usePayment";
import { axiosClient } from "services";
import { AxiosResponse } from "axios";

const stripePromise = axiosClient
  .get("payment/publishable-key")
  .then((response: AxiosResponse<{ success: boolean; pKey: string }, Error>) =>
    loadStripe(response.data.pKey)
  );
/* const stripePromise = loadStripe(
  "pk_test_51KMEcKATulpGYXk79afZReVLyPX0nOzbj2B0Y0YsT6AbSvGLCWSFHuNaekovKFDUR0Rl5SyzMcNoEU0gP2TT7ib700yaFdTQ04"
); */

const Checkout: FC = () => {
  const { data: userData } = useUserData();
  const paymentIntentMutate = usePaymentIntent();

  useEffect(() => {
    if (userData?.user !== undefined && appointmentData !== undefined) {
      paymentIntentMutate.mutate({ userData: userData.user, appointmentData });
    }
  }, [userData?.user]);

  const { state } = useLocation<{ appointmentData: AppointmentModel }>();
  if (state === undefined) return <Redirect to="/studentDashboard" />;
  const { appointmentData } = state;
  if (appointmentData === undefined) return <Redirect to="/studentDashboard" />;

  console.log(
    "mutated",
    paymentIntentMutate.data?.paymentIntent?.client_secret || ""
  );

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret: paymentIntentMutate.data?.paymentIntent?.client_secret || "",
    appearance,
    fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Poppins:400" }],
  };
  const fonts = [
    { cssSrc: "https://fonts.googleapis.com/css?family=Podkova:400" },
  ];
  return (
    <div>
      {paymentIntentMutate.isLoading ? (
        <Center minH={"80vh"}>
          <Spinner />
        </Center>
      ) : (
        paymentIntentMutate.data?.paymentIntent?.client_secret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              appointmentData={appointmentData}
              paymentIntent={paymentIntentMutate.data?.paymentIntent}
            />
          </Elements>
        )
      )}
    </div>
  );
};

export default Checkout;
