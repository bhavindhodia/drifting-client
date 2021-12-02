import { FC, Key } from "react";
import { Stack, Heading, Text, Container, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";

export type WorkingCardProps = {
  id?: Key;
  title: string;
  imgName: string;
  subtitle: string;
};

const WorkingCard: FC<WorkingCardProps> = (props: WorkingCardProps) => {
  const { id, imgName, title, subtitle } = props;
  const myimage = require(`assets/img/${imgName}.svg`).default;
  console.log("id", id);

  return (
    <Stack
      spacing={4}
      align="center"
      direction={[
        "column",
        "column",
        id === 1 ? "column-reverse" : "column",
        id === 1 ? "column-reverse" : "column",
      ]}
    >
      <Image boxSize="sm" src={myimage} alt="images error" />
      <VStack spacing="6">
        <Heading textAlign="center" fontWeight="bold" size="lg">
          {title}
        </Heading>
        <Text size="lg">{subtitle}</Text>
      </VStack>
    </Stack>
  );
};

export default WorkingCard;
