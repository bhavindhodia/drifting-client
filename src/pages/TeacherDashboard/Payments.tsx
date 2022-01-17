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
import { useGetPayments } from "hooks";
import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
const Payments = () => {
  const { data, error, isLoading, isFetching } = useGetPayments();
  console.log("Paymentdata", data);

  const handleRefund = (item: any) => {};

  return isLoading ? (
    <Center py={6} minH={"80vh"}>
      <Spinner />
    </Center>
  ) : (
    <Table variant="simple" colorScheme={"blackAlpha"}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Amount</Th>
          <Th>Description</Th>
          <Th isNumeric>Date</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.paymentIntents?.data.map((item: any, key: number) => (
          <Tr>
            <Td>US${item?.amount}</Td>
            <Td>{item?.description}</Td>
            <Td>{new Date(item?.created * 1000).toLocaleString()}</Td>
            <Td>
              <Button onClick={() => handleRefund(item)}>Refund</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Payments;
