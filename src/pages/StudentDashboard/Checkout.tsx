import { useEffect, FC } from "react";
import {
  loadStripe,
  StripeElementsOptions,
  Appearance,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import { Redirect, useLocation } from "react-router-dom";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { usePaymentIntent, useUserData } from "hooks";
import { axiosClient } from "services";
import { AxiosResponse } from "axios";

const stripePromise = axiosClient
  .get("payment/publishable-key")
  .then((response: AxiosResponse<{ success: boolean; pKey: string }, Error>) =>
    loadStripe(response.data.pKey)
  );

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
