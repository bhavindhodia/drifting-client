import { PaymentIntent, StripeError } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Heading, Text, Link } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { Link as ReactLink } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai";
import { AppointmentType } from "hooks/appointmentReducer";
import { useUserData } from "hooks";
import { axiosClient } from "services";
import axios from "axios";

type LocationState = {
  paymentIntentResult: PaymentIntent;
  appointmentData: AppointmentType;
  error: StripeError;
};

enum StatusChoice {
  ERROR,
  SUCCESS,
  INFO,
}
type StatusType = {
  type: StatusChoice;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
};

const PaymentResult2 = () => {
  const { state } = useLocation<LocationState>();
  const { data: userData } = useUserData();

  const [status, setStatus] = useState<StatusType>({
    type: StatusChoice.ERROR,
    bgColor: "",
    iconColor: "",
    title: "",
    description: "",
  });
  const init = async () => {
    const paymentIntent = state.paymentIntentResult;

    if (state.error !== undefined) {
      setStatus({
        type: StatusChoice.ERROR,
        bgColor: "red.100",
        iconColor: "red.800",
        title: "Payment decline",
        description: state.error.message || "",
      });
    } else {
      const x = await processStatus(paymentIntent.status);
      if (x !== undefined) setStatus(x);
    }
  };
  useEffect(() => {
    console.log("appointment", state.appointmentData);
    if (
      state !== undefined &&
      state.appointmentData !== undefined &&
      state.paymentIntentResult === undefined
    ) {
      if (state.appointmentData.price === 0) {
        createFreeAppointment(state.appointmentData);
      } else {
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Error Occured",
          description: "Meeting should be free to book",
        });
      }
    } else if (
      state === undefined ||
      state.appointmentData === undefined ||
      state.paymentIntentResult === undefined
    ) {
      setStatus({
        type: StatusChoice.ERROR,
        bgColor: "red.100",
        iconColor: "red.800",
        title: "Error occured",
        description: "Something went wrong",
      });
    } else {
      init();
    }
  }, []);

  const createFreeAppointment = async (appointmentData: AppointmentType) => {
    const studentUpdate = "/appointment/studentUpdateNP";
    console.log("auth?.userData?.id,", userData?.user?.id);
    try {
      const updatedData = await axiosClient.post(studentUpdate, {
        appointmentData,
        studentID: userData?.user.id.toString(),
      });
      console.log("updatedData", updatedData);
      if (updatedData.data?.success) {
        setStatus({
          type: StatusChoice.SUCCESS,
          bgColor: "green.100",
          iconColor: "green.800",
          title: `Success`,
          description: "Appointment booked successfully",
        });
      } else {
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.200",
          iconColor: "red.800",
          title: "Failed to book",
          description: "Payment failed. Please try again",
        });
      }
      // return updatedData.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error?.response?.data);
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Booking Failed",
          description: error?.response?.data.errorMessage || "",
        });
      } else {
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Booking Failed",
          description: "Error occured. Please try again",
        });
      }
    }
  };

  const createAppointment = async (
    appointmentData: AppointmentType,
    paymentIntent: PaymentIntent
  ) => {
    const studentUpdate = "/appointment/studentUpdate";
    console.log("auth?.userData?.id,", userData?.user?.id);
    try {
      const updatedData = await axiosClient.post(studentUpdate, {
        appointmentData,
        paymentIntent,
        studentID: userData?.user.id.toString(),
      });
      console.log("updatedData", updatedData);
      if (updatedData.data?.success) {
        return {
          type: StatusChoice.SUCCESS,
          bgColor: "green.100",
          iconColor: "green.800",
          title: `Payment Success`,
          description: "Appointment booked successfully",
        };
      } else {
        return {
          type: StatusChoice.ERROR,
          bgColor: "red.200",
          iconColor: "red.800",
          title: "Payment Failed",
          description: "Payment failed. Please try again",
        };
      }
      // return updatedData.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error?.response?.data);
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Payment Failed",
          description: error?.response?.data.errorMessage || "",
        });
      } else {
        setStatus({
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Payment Failed",
          description: "Error occured. Please try again",
        });
      }
    }
  };

  const processStatus = async (status: PaymentIntent.Status) => {
    switch (status) {
      case "canceled":
      case "requires_confirmation":
      case "requires_payment_method":
      case "requires_action":
        return {
          type: StatusChoice.ERROR,
          bgColor: "red.100",
          iconColor: "red.800",
          title: "Payment decline",
          description:
            state.paymentIntentResult?.last_payment_error?.message || "",
        };

      case "processing":
        return {
          type: StatusChoice.INFO,
          bgColor: "yellow.400",
          iconColor: "yellow.800",
          title: "Payment is Processing",
          description: "Please be patient. Your payment is process.",
        };
      case "succeeded":
        //const appointmentData: AppointmentType = state.paymentIntentResult?.;
        return createAppointment(
          state.appointmentData,
          state.paymentIntentResult
        );
        return;
      default:
        return {
          type: StatusChoice.INFO,
          bgColor: "black",
          iconColor: "grey",
          title: "Something went wrong",
          description: "Please try again.",
        };
    }
  };

  return (
    <Box textAlign="center" minH="80vh" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={status.bgColor}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <Icon as={FcApproval} color={status.iconColor} w={8} h={8} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {status.title}
      </Heading>
      <Text color={"gray.700"}>{status.description}</Text>

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

export default PaymentResult2;
