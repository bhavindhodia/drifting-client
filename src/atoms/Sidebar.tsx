import { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiMenu,
  FiBell,
  FiStar,
  FiTrendingUp,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useLogout } from "hooks";
import { Logo } from "atoms";
import { useUserData, useIsAuthenticated } from "hooks";

interface LinkItemProps {
  name: string;
  url: string;
  icon: IconType;
  role: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Home",
    icon: FiHome,
    url: "/studentDashboard/",
    role: "STUDENT",
  },
  {
    name: "Profile",
    icon: FiCompass,
    url: "/studentDashboard/profile",
    role: "STUDENT",
  },
  {
    name: "Meeting",
    icon: FiCompass,
    url: "/studentDashboard/meeting",
    role: "STUDENT",
  },
  { name: "Home", icon: FiHome, url: "/teacherDashboard/", role: "TEACHER" },
  {
    name: "Appointment",
    icon: FiTrendingUp,
    url: "/teacherDashboard/appointment",
    role: "TEACHER",
  },
  {
    name: "Profile",
    icon: FiCompass,
    url: "/teacherDashboard/profile",
    role: "TEACHER",
  },
  {
    name: "Payments",
    icon: FiStar,
    url: "/teacherDashboard/payments",
    role: "TEACHER",
  },
  {
    name: "Settings",
    icon: FiSettings,
    url: "/teacherDashboard/appointment",
    role: "TEACHER",
  },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.300")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        bgColor={useColorModeValue("white", "gray.300")}
        p="4"
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isLoading: userDataLoading, data: userData } = useIsAuthenticated();
  /* console.log("sideData", userData); */
  const myRole = userData !== undefined ? userData?.role : "";

  return (
    <Box
      transition="3s ease"
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Logo />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {userDataLoading || userData?.role === undefined ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        LinkItems.map(
          (link) =>
            myRole === link.role.toString() && (
              <NavItem key={link.name} urlPath={link.url} icon={link.icon}>
                {link.name}
              </NavItem>
            )
        )
      )}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  urlPath: string;
  children: ReactText;
}
const NavItem = ({ icon, urlPath, children, ...rest }: NavItemProps) => {
  return (
    <Link as={ReactLink} to={urlPath} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { isLoading: userDataLoading, data: userData } = useUserData();
  const logoutMutation = useLogout();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Logo />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  // loading={userDataLoading}
                  size={"sm"}
                  name={userData?.user.name}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {/* <Text fontSize="sm">{auth.userData!.name}</Text> */}
                  <Text fontSize="sm">
                    {userData ? userData.user.name : "Loading"}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {userData ? userData.user.role : "Loading"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              zIndex={9}
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>

              <MenuDivider />
              {/*  <MenuItem onClick={logoutUser}>Sign out</MenuItem> */}
              {
                <MenuItem onClick={() => logoutMutation.mutate()}>
                  Sign out
                </MenuItem>
              }
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
