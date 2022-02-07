import { FC, PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";
import NavBar from "../Navbar";
import Footer from "../Footer";

const LandingLayout: FC<PropsWithChildren<{}>> = (props): JSX.Element => {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1500px" }}
      m="0 auto"
      {...props}
    >
      <NavBar />
      {props.children}
      <Footer />
    </Flex>
  );
};

export default LandingLayout;
