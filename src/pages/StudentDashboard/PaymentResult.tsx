import { FC, useEffect, useState, useContext } from "react";
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
import { AuthContext } from "services";
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

type LocationState = {
  title: string;
  retultType: string;
};

const PaymentResult: FC<PaymentResultProps> = () => {
  const { auth } = useContext(AuthContext);
  const payment_intent = new URLSearchParams(window.location.search).get(
    "payment_intent"
  );
  const redirect_status = new URLSearchParams(window.location.search).get(
    "redirect_status"
  );

  const [data, setData] = useState<PaymentResultProps>();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation<LocationState>();

  console.log("auth", auth);
  useEffect(() => {
    if (redirect_status !== "succeeded" || state !== undefined) {
      setData({
        title: "Payment Failed",
        description: state?.title,
        resultType: PaymentResultType.ERROR,
      });
    } else if (auth.userData !== undefined) {
      checkPaymentStatus();
    }
  }, [auth.userData]);

  const createAppointment = async (
    appointmentData: AppointmentType,
    paymentIntent: PaymentIntent
  ) => {
    const studentUpdate = "/appointment/studentUpdate";
    console.log("auth?.userData?.id,", auth?.userData?.id);
    try {
      const updatedData = await axios.post(studentUpdate, {
        appointmentData,
        paymentIntent,
        studentID: auth?.userData?.id.toString(),
      });
      console.log("updatedData", updatedData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error?.response?.data);
        setData({
          title: "Payment Failed",
          description: error?.response?.data.message,
          resultType: PaymentResultType.ERROR,
        });
      } else {
        setData({
          title: "Payment Failed",
          description: "Error occured. Please try again",
          resultType: PaymentResultType.ERROR,
        });
      }
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

  return loading || !auth.userData ? (
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
