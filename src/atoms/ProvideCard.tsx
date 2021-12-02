import { FC, Key } from "react";
import { Stack, Heading, Text, Container, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

export type ProvideCardProps = {
  id?: number;
  title: string;
  imgName: string;
  subtitle: string;
};

const ProvideCard: FC<ProvideCardProps> = (props: ProvideCardProps) => {
  const { id = 0, imgName, title, subtitle } = props;
  const myimage = require(`assets/img/${imgName}.svg`).default;
  //console.log("id", id);

  return (
    <Stack
      spacing={4}
      align="center"
      direction={[
        "column",
        "column",
        id % 2 === 0 ? "row" : "row-reverse",
        id % 2 === 0 ? "row" : "row-reverse",
      ]}
    >
      <Image boxSize="sm" src={myimage} alt="images error" />
      <VStack justifyContent="center" spacing="6" px={8}>
        <Heading textAlign="center" fontWeight="bold" size="lg">
          {title}
        </Heading>
        <Text size="lg">{subtitle}</Text>
      </VStack>
    </Stack>
  );
};

export default ProvideCard;
