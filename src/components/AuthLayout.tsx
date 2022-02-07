import { FC, PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/layout";
import { Logo } from "atoms";
/* import { AiFillLeftCircle } from "react-icons/ai";
import { Icon } from "@chakra-ui/icon"; */
const AuthLayout: FC<PropsWithChildren<{}>> = (props): JSX.Element => {
  return (
    <Flex
      direction="column"
      align={"flex-start"}
      maxW={{ xl: "1500px" }}
      {...props}
      m={"0 auto"}
    >
      <Flex flexDirection={"row"} ml={6} pl={6} mt={6}>
        {/* <Box align={"center"} justifyContent={"center"} px={6}>
          <Icon w={6} h={6} as={AiFillLeftCircle} />
        </Box> */}

        <Logo />
      </Flex>
      {props.children}
    </Flex>
  );
};

export default AuthLayout;
