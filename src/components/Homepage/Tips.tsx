import { VStack, Heading, Text, SimpleGrid } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
type TipsProps = {
  title: string;
  subtitle: string;
  btnTxt: string;
  imgName: string;
};

const Tips = (props: { tipsData: TipsProps }) => {
  return (
    <SimpleGrid
      px={8}
      my={8}
      columns={2}
      spacing={10}
      gridTemplateColumns="60% 40%"
    >
      <VStack py={16}>
        <Heading>{props.tipsData.title}</Heading>
        <Text>{props.tipsData.subtitle}</Text>
        <Button
          variant="gradiant"
          size="lg"
          colorScheme={"success"}
          bgGradient="linear-gradient(to right, #13f066, #38ef7d);"
        >
          {props.tipsData.btnTxt}
        </Button>
      </VStack>
      <Image
        w="80%"
        rounded="lg"
        justifyContent="flex-end"
        src={require(`assets/img/${props.tipsData.imgName}.svg`).default}
        alt="tips img error"
      />
    </SimpleGrid>
  );
};

export default Tips;
