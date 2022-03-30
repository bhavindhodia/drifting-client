import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  PaymentIntent,
  StripeCardElementChangeEvent,
  StripeElementChangeEvent,
} from "@stripe/stripe-js";
import { Box, Stack, VStack, Text, Center } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { Input } from "@chakra-ui/input";
import { useMediaQuery } from "@chakra-ui/media-query";
import { GiWallet } from "react-icons/gi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { showMyToast } from "atoms";

const CARD_OPTIONS = {
  //iconStyle: StripeCardElement ,
  style: {
    base: {
      iconColor: "#01476B",
      color: "#000",
      colorBackground: "red",

      fontWeight: 500,
      fontFamily: "Poppins,Lato,Montserrat, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#ECC94B",
      },
      "::placeholder": {
        color: "#01476B",
      },
    },
    invalid: {
      iconColor: "#C53030",
      color: "#F56565",
    },
  },
};

type FormDataType = {
  name: string;
  email: string;
};

type CheckoutFormPropType = {
  paymentIntent: PaymentIntent;
  appointmentData: AppointmentModel;
};

const CheckoutForm = ({
  paymentIntent,
  appointmentData,
}: CheckoutFormPropType) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [message, setMessage] = useState("");
  const [cardEvent, setCardEvent] = useState<StripeElementChangeEvent>();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    name: "",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !paymentIntent?.client_secret) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    setIsLoading(true);
    if (cardElement) {
      const {
        error,
        paymentIntent: paymentIntentResult,
      } = await stripe.confirmCardPayment(paymentIntent?.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData?.name,
            email: formData?.email,
            //name: ev.target.name.value,
          },
        },
      });
      console.log("errir", error);
      console.log("paymentIntentResult", paymentIntentResult);

      if (paymentIntentResult !== undefined) {
        history.push(
          `/studentDashboard/payment-status?payment_intent=${paymentIntentResult.id}&payment_intent_client_secret=${paymentIntentResult.client_secret}&redirect_status=${paymentIntentResult.status}`,
          {
            paymentIntentResult,
            error,
            appointmentData,
          }
        );
      } else {
        setMessage("bhavin");
      }
    }
    setIsLoading(false);
  };

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((oldData) => {
      return { ...oldData, [event.target.name]: event.target.value };
    });
  };

  return stripe === null || elements === null ? (
    <Center minH={"80vh"}>
      <Spinner />
    </Center>
  ) : (
    <Stack
      spacing={4}
      width={"100%"}
      justifyContent={"space-around"}
      minH={"80vh"}
      direction={["row", "row", "row", "row"]}
    >
      {message && showMyToast(toast, "error", message)}
      {!isMobile && (
        <Image
          boxSize="sm"
          src={require(`assets/img/checkout.svg`).default}
          alt="images error"
        />
      )}
      <VStack justifyContent="center" spacing="6" bgColor={"gray.200"} px={8}>
        <form
          id="payment-form"
          style={{
            width: isMobile ? "75vw" : "30vw",
            minWidth: "300px",
            alignSelf: "center",
            padding: "2rem",
          }}
          onSubmit={handleSubmit}
        >
          <fieldset
            style={{
              borderRadius: "5px",
            }}
          >
            <Input
              variant="unstyled"
              focusBorderColor="primary.500"
              placeholder="Name on card"
              name="name"
              bgColor={"white"}
              p={2}
              width="100%"
              onChange={handleFormDataChange}
            />
            <Input
              variant="unstyled"
              focusBorderColor="primary.500"
              placeholder="Email"
              name="email"
              bgColor={"white"}
              p={2}
              my={2}
              onChange={handleFormDataChange}
            />
          </fieldset>
          <fieldset
            style={{
              backgroundColor: "var(--chakra-colors-white)",
              borderRadius: "5px",
              margin: "2rem 0",
              padding: "1rem",
            }}
          >
            <CardElement
              options={CARD_OPTIONS}
              onChange={(event: StripeCardElementChangeEvent) =>
                setCardEvent(event)
              }
            />
          </fieldset>
          {cardEvent?.error && (
            <Text size="md" color={"red.500"} mt={4}>
              {cardEvent?.error.message}
            </Text>
          )}
          {/* For Demo Payment */}
          <Box my="1.5rem">
            <Text mt="2" color={"primary.500"}>
              Card Number : 4242424242424242
            </Text>
          </Box>
          <Box my="1.5rem">
            <Button
              id="submit"
              py="1rem"
              width={"100%"}
              disabled={
                isLoading || !stripe || !elements || !cardEvent?.complete
              }
              isLoading={isLoading}
              loadingText="Proccessing"
              color="white"
              bgColor={"#2054f5"}
              leftIcon={<GiWallet size={"1.25rem"} />}
              type="submit"
            >
              Pay ${" "}
              {paymentIntent?.amount !== undefined &&
                paymentIntent?.amount / 100}
            </Button>
          </Box>
        </form>
      </VStack>
    </Stack>
  );
  /*   </Box> */
};

export default CheckoutForm;
