import { Flex, Stack, Heading, Button, Text, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

type HeroProps = {
  title: string;
  subtitle: string;
  buttonTxt: string;
};
const Hero = ({ title, subtitle, buttonTxt }: HeroProps) => {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      // wrap="no-wrap"
      w="100%"
      minH="100vh"
      px={8}
      mb={2}
      pr={8}
    >
      <Stack
        spacing={4}
        w={{ base: "90%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          size="2xl"
          fontWeight="bold"
          color="black"
          w={{ lg: "50%", md: "80%" }}
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Text
          size="lg"
          color="black.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          w={{ lg: "40%", md: "80%" }}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Text>
        <Link as={ReactLink} to="/login">
          <Button
            colorScheme="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {buttonTxt}
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
};

export default Hero;
