import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/table";
import { useGetPayments, useSingleRefund, useUserData } from "hooks";
import { IconButton } from "@chakra-ui/button";
import { Center, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Link } from "@chakra-ui/layout";
import { Tag, TagRightIcon } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
import { IconType } from "react-icons";
import { MyPaymentIntent } from "types";
import { Icon } from "@chakra-ui/icon";
import { FcMoneyTransfer } from "react-icons/fc";
import { BiCheckDouble, BiLoader } from "react-icons/bi";
import { GrRevert } from "react-icons/gr";
import { BsFillExclamationTriangleFill, BsReceipt } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";

const Payments = () => {
  const { data, isLoading } = useGetPayments();
  const { data: userData } = useUserData();
  const createRefund = useSingleRefund();

  const handleRefund = (item: MyPaymentIntent) => {
    createRefund.mutate(item);
  };

  return isLoading || userData === undefined ? (
    <Center py={6} minH={"80vh"}>
      <Spinner />
    </Center>
  ) : data.paymentIntents !== undefined || data.paymentIntents.length > 0 ? (
    <Table variant="simple" colorScheme={"blackAlpha"}>
      <TableCaption>
        Find more metrics about payments at &nbsp;
        <Link href="https://dashboard.stripe.com/" isExternal>
          <Heading color={"#635bff"} variant={"h4"} size={"sm"}>
            Stripe Dashboard
          </Heading>
        </Link>
      </TableCaption>
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
            /* falls through */
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
              <Td>
                {item.currency.toUpperCase()} ${item.amount / 100}
              </Td>
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
                {userData.user.role.toString() === "TEACHER" && (
                  <Tooltip
                    hasArrow
                    label="Refund Payment"
                    bg="gray.300"
                    color="black"
                  >
                    <IconButton
                      aria-label="Refund"
                      icon={<GrRevert />}
                      isLoading={createRefund.isLoading}
                      isDisabled={item.refunded}
                      size="sm"
                      mx={1}
                      colorScheme={"purple"}
                      //bgColor={"purple"}
                      onClick={() => handleRefund(item)}
                    />
                  </Tooltip>
                )}
                <Tooltip
                  hasArrow
                  label="View Recipt"
                  bg="gray.300"
                  color="black"
                >
                  <Link
                    href={`${item.charges.data[0][0].receipt_url}`}
                    isExternal
                  >
                    <IconButton
                      aria-label="Recipt"
                      icon={<BsReceipt />}
                      size="sm"
                      mx={1}
                    />
                  </Link>
                </Tooltip>
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
