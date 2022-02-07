import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Logo from "atoms/Logo";
import footerData from "data/footerData.json";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const colSize = Object.keys(footerData).length || 4;

  return (
    <Box
      w="100%"
      mt={16}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: colSize }} spacing={8}>
          {Object.entries(footerData).map(([key, value], i) => (
            <Stack key={i} align={"flex-start"}>
              <ListHeader>{key}</ListHeader>
              {value.map((item, ind) => (
                <Link key={ind} href={item.link}>
                  {item.title}
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Flex>
            <Logo />
          </Flex>
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2021 Drifting Parliament. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}
