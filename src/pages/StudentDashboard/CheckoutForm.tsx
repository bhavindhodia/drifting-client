import React, { useState, FC, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { GiWallet } from "react-icons/gi";
import { toast } from "react-toastify";
import { AppContext } from "hooks/appointmentContext";
import { useHistory } from "react-router-dom";
import { AuthContext } from "services";
const toastID = "Payment Page";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(AppContext);
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error }: { error: StripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/studentDashboard/payment-status",
      },
    });
    console.log("errir", error);
    if (error.type === "card_error" || error.type === "validation_error") {
      // setMessage(error?.message || "Yoo Error Here");
      history.push(
        `/studentDashboard/payment-status?payment_intent=${error.payment_intent?.id}&payment_intent_client_secret=${error.payment_intent?.client_secret}&redirect_status=${error.type}`,
        {
          resultType: "error",
          title: error?.message,
        }
      );
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return stripe === null || elements === null ? (
    <Spinner />
  ) : (
    <Box
      display={"flex"}
      justifyContent={"center"}
      minH={"100vh"}
      alignContent={"center"}
    >
      <form
        id="payment-form"
        style={{
          width: "30vw",
          minWidth: "500px",
          alignSelf: "center",
        }}
        onSubmit={handleSubmit}
      >
        {message && toast(message, { toastId: toastID })}
        <PaymentElement id="payment-element" />
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          my="1.5rem"
          p="1rem"
        >
          <Button
            id="cancel"
            px="1.8rem"
            py="1rem"
            disabled={isLoading || !stripe || !elements}
            bg="danger"
            leftIcon={<GiWallet size={"1.25rem"} />}
            mx={2}
          >
            Cancel
          </Button>
          <Button
            id="submit"
            px="1.8rem"
            py="1rem"
            disabled={isLoading || !stripe || !elements}
            isLoading={isLoading}
            loadingText="Proccessing"
            bg="success"
            leftIcon={<GiWallet size={"1.25rem"} />}
            type="submit"
            mx={2}
          >
            Book it !
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CheckoutForm;
