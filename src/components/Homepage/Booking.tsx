import React from "react";
import { Flex, Heading, Box, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { Link as ReactLink } from "react-router-dom";

const Booking = ({
  bookingTitle,
  btnTxt,
  subtitle,
}: {
  bookingTitle: string;
  subtitle: string;
  btnTxt: string;
}) => {
  return (
    <Flex
      w="100%"
      bgGradient=" linear-gradient(280deg, rgba(2,0,36,1) 0%, rgba(14,160,235,1) 0%, rgba(27,211,249,1) 57%, rgba(83,226,255,1) 92%)"
      align="center"
      p={16}
      my={8}
      justifyContent="space-between"
    >
      <Box>
        <Heading fontWeight="bold" size="2xl">
          {bookingTitle}
        </Heading>
        <Heading mt="1.5rem" fontWeight="light" size="md" color="primary.700">
          {subtitle}
        </Heading>
      </Box>
      <Link as={ReactLink} to="/login">
        <Button variant="solid" size="lg">
          {btnTxt}
        </Button>
      </Link>
    </Flex>
  );
};

export default Booking;
