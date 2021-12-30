import { FC, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Icon,
  Flex,
  Button,
  Link,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { PaymentIntent } from "@stripe/stripe-js";
import { AppointmentType } from "hooks/appointmentReducer";
import axios from "axios";

export enum PaymentResultType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

type PaymentResultProps = {
  title: string;
  description: string;
  resultType: PaymentResultType;
};

const PaymentResult: FC<PaymentResultProps> = () => {
  const { state } = useLocation();
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  const redirect_status = new URLSearchParams(window.location.search).get(
    "redirect_status"
  );

  const [data, setData] = useState<PaymentResultProps>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkPaymentStatus();
  }, []);

  if (redirect_status !== "succeeded") {
  }
  const createAppointment = async (
    appointmentData: AppointmentType,
    paymentIntent: PaymentIntent
  ) => {
    const createAppointmentUrl = "/appointment";
    try {
      const createdAppointment = await axios.post(createAppointmentUrl, {
        appointmentData,
        paymentIntent,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkPaymentStatus = async () => {
    const paymentStatusUrl = `/appointment/payment-status/${payment_intent}`;
    try {
      setLoading(true);
      const response = await axios.get(paymentStatusUrl);
      //console.log("response", response.data.paymentStatus);
      const paymentStatus = response.data.charges.data[0].status;
      switch (paymentStatus) {
        case "succeeded":
          const appointmentData: AppointmentType =
            JSON.parse(localStorage.getItem("newAppointment") || "") || "";
          createAppointment(appointmentData, response.data);
          setData({
            title: "Payment Success",
            description: "Your appointment has been booked successfully",
            resultType: PaymentResultType.SUCCESS,
          });
          break;
        case "failed":
          setData({
            title: "Payment Failed",
            description: response.data.charges.data[0].failure_message,
            resultType: PaymentResultType.SUCCESS,
          });
          break;
        case "processing":
          //setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          // setMessage("Your payment was not successful, please try again.");
          break;
        default:
          //setMessage("Something went wrong.");
          break;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = (type: PaymentResultType | undefined) => {
    switch (type) {
      case "error":
        return "red.100";
      case "info":
        return "blue.100";
      default:
        return "green.100";
    }
  };
  const iconColor = (type: PaymentResultType | undefined) => {
    switch (type) {
      case "error":
        return "red.800";
      case "info":
        return "blue.800";
      default:
        return "green.800";
    }
  };

  return loading ? (
    <Center>
      <Spinner />
    </Center>
  ) : (
    <Box textAlign="center" minH="80vh" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={bgColor(data?.resultType)}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon
            as={FcApproval}
            color={iconColor(data?.resultType)}
            w={8}
            h={8}
          />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {data?.title}
      </Heading>
      <Text color={"gray.700"}>{data?.description}</Text>

      <Link as={ReactLink} to="/studentDashboard">
        <Button
          mt={16}
          px={10}
          py={6}
          bg="success"
          leftIcon={<AiOutlineHome size={30} />}
          iconSpacing={6}
        >
          <Heading as="h3" size="md">
            Home
          </Heading>
        </Button>
      </Link>
    </Box>
  );
};

export default PaymentResult;
