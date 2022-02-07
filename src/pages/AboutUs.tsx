import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import { LandingLayout } from "components";
import aboutData from "../data/aboutData.json";
import AboutUsImg from "assets/img/aboutus.svg";
/* interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
} */

/* const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};
 */
/* interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
 */
const AboutUs = () => {
  return (
    <Box>
      <LandingLayout>
        <Container maxW={"7xl"} p="12">
          <Heading as="h1">{aboutData.heading}</Heading>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={AboutUsImg}
                    alt="some good alt text"
                    objectFit="contain"
                  />
                </Link>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={useColorModeValue(
                    "radial(orange.600 1px, transparent 1px)",
                    "radial(orange.300 1px, transparent 1px)"
                  )}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {aboutData.card1.title}
                </Link>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="lg"
              >
                {aboutData.card1.description}
              </Text>
            </Box>
          </Box>

          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h2">{aboutData.card2.title}</Heading>
            <Text as="p" fontSize="lg">
              {aboutData.card2.description1}
            </Text>
            <Text as="p" fontSize="lg">
              {aboutData.card2.description2}
            </Text>
            <Text as="p" fontSize="lg">
              {aboutData.card2.description3}
            </Text>
          </VStack>
        </Container>
      </LandingLayout>
    </Box>
  );
};

export default AboutUs;
