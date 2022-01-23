import React, { useEffect, useContext } from "react";
import { Box, Flex, Link, Button, Stack } from "@chakra-ui/react";
import Logo from "atoms/Logo";
import { Link as ReactLink } from "react-router-dom";
import { useIsAuthenticated } from "hooks";
import { AuthContext, AuthContextType } from "services/AuthContext";

/* const Links = ["Dashboard", "Projects", "Team"];
 */
type NavbarType = {
  toggle: () => void;
  isOpen: boolean;
};

const NavBar: React.FC<{}> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: auth } = useIsAuthenticated();
  //const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  /*   const { verifyUser } = useAuth();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    verifyUser();
  }, [verifyUser]); */

  /*  console.log("Menu User", auth); */
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Box display="flex" flexFlow="row">
        <Logo />
      </Box>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} authState={auth} />
      {/* <MenuLinks isOpen={isOpen} authState={auth} /> */}
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }: NavbarType) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({
  children,
  isLast,
  url = "/",
  ...rest
}: {
  children: React.ReactElement<any, any> | string;
  isLast?: boolean;
  url: string;
}) => {
  return (
    <Link as={ReactLink} to={url}>
      <h3>{children}</h3>
    </Link>
  );
};

const MenuLinks = ({
  isOpen,
  authState,
}: {
  isOpen: boolean;
  authState: AuthContextType | undefined;
}) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem url="/">Home</MenuItem>
        <MenuItem url="/aboutus">About Us</MenuItem>
        <MenuItem url="/blog">Blog </MenuItem>
        {/*   <MenuItem url={authState.redirectPath} isLast> */}
        <MenuItem
          url={
            authState !== undefined && authState.success
              ? authState.redirectPath
              : "/login"
          }
          isLast
        >
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "white", "white"]}
            bg={["white", "white", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"],
            }}
          >
            {authState !== undefined && authState.success
              ? "Dashboard"
              : "Log In"}
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer: React.FC<{}> = ({ children, ...props }) => {
  return (
    <Flex
      zIndex="999"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py={3}
      px={20}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
