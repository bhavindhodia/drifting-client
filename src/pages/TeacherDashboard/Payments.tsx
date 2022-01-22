import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/table";
import { useGetPayments, useSingleRefund } from "hooks";
import { Button } from "@chakra-ui/button";
import { Center, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Tag, TagRightIcon } from "@chakra-ui/tag";
import { PaymentIntent } from "@stripe/stripe-js";
import { Icon } from "@chakra-ui/icon";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiCheckDouble, BiLoader } from "react-icons/bi";
import { GrRevert } from "react-icons/gr";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";

export interface MyPaymentIntent extends PaymentIntent {
  _id: string;
  appointmentId: string;
  studentId: string;
  refunded: boolean;
}

const Payments = () => {
  const { data, isLoading } = useGetPayments();
  const createRefund = useSingleRefund();

  const handleRefund = (item: MyPaymentIntent) => {
    createRefund.mutate(item);
  };

  return isLoading ? (
    <Center py={6} minH={"80vh"}>
      <Spinner />
    </Center>
  ) : data?.paymentIntents.length > 0 ? (
    <Table variant="simple" colorScheme={"blackAlpha"}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Amount</Th>
          <Th>Status</Th>
          <Th>Description</Th>
          <Th isNumeric>Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.paymentIntents.map((item: MyPaymentIntent) => {
          let tagColor = "";
          let tagIcon: IconType = BiCheckDouble;
          switch (item.status) {
            case "succeeded":
              tagColor = "green";
              break;
            case "processing":

            case "requires_capture":
            case "requires_confirmation":
            case "requires_payment_method":
              tagColor = "yellow";
              tagIcon = IoAlertCircleOutline;
              break;
            case "processing":
              tagColor = "blue";
              tagIcon = BiLoader;
              break;
            case "canceled":
            case "requires_action":
              tagColor = "red";
              tagIcon = BsFillExclamationTriangleFill;
              break;

            default:
              tagColor = "green";
              tagIcon = BiCheckDouble;
              break;
          }
          if (item.refunded) {
            tagIcon = GrRevert;
            tagColor = "purple";
          }

          return (
            <Tr>
              <Td>US${item.amount}</Td>
              <Td>
                <Tag
                  borderRadius="full"
                  variant="subtle"
                  colorScheme={tagColor}
                >
                  {item.refunded ? "refunded" : item.status}
                  <TagRightIcon as={tagIcon} />
                </Tag>
              </Td>
              <Td>{item.description}</Td>
              <Td>{new Date(item.created * 1000).toLocaleString()}</Td>
              <Td>
                <Button
                  isLoading={createRefund.isLoading}
                  isDisabled={item.refunded}
                  size="sm"
                  onClick={() => handleRefund(item)}
                >
                  Refund
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  ) : (
    <Flex minH="full" minW="full" bg="white" py={[6, 24]} justify="center">
      <Icon as={FcMoneyTransfer} w="8" h="8" mr="4" />

      <Heading>No payments</Heading>
    </Flex>
  );
};

export default Payments;
