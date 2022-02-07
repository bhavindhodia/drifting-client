import { Heading, Stack, Flex } from "@chakra-ui/layout";
import ProvideCard from "atoms/ProvideCard";
import { ProvideCardProps } from "atoms/ProvideCard";
const Provide = (props: { headingTitle: string; data: ProvideCardProps[] }) => {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={"column"}
      w="100%"
      px={8}
      my={8}
    >
      <Heading textAlign="center" mb={12} fontWeight="extrabold" size="xl">
        {props.headingTitle}
      </Heading>
      <Stack direction={"column"}>
        {props.data.map((item, key) => (
          <ProvideCard
            key={key}
            id={key}
            title={item.title}
            subtitle={item.subtitle}
            imgName={item.imgName}
          />
        ))}
      </Stack>
    </Flex>
  );
};
export default Provide;
