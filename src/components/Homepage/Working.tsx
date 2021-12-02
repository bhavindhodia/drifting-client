import React from "react";
import { Heading, Stack, Flex } from "@chakra-ui/layout";
import { WorkingCard } from "atoms";
import { WorkingCardProps } from "atoms/WorkingCard";

export default (props: { headingTitle: string; data: WorkingCardProps[] }) => {
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
      <Stack direction={["column", "column", "column", "row"]}>
        {props.data.map((item, key) => (
          <WorkingCard
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
